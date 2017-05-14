import React from 'react';
import ReactDOM from 'react-dom';

import { render, mount } from 'enzyme';

import Timeline from '../../../src/components/Timeline/Timeline';
import timelineFixture from '../../__fixtures__/timeline';

function simulateSwipe(selector, direction) {
  const directions = {
    up: {
      x: 0,
      y: -90,
    },
    down: {
      x: 0,
      y: 90,
    },
    right: {
      x: 90,
      y: 0,
    },
    left: {
      x: -90,
      y: 0,
    },
  };

  const delta = directions[direction];

  selector
    .simulate('touchstart', {
      touches: [{
        clientX: 100,
        clientY: 100,
      }],
    })
    .simulate('touchmove')
    .simulate('touchend', {
      changedTouches: [{
        clientX: 100 + delta.x,
        clientY: 100 + delta.y,
      }],
    });
}


describe('Timeline', () => {
  it('should be rendered without crashing', () => {
    const root = document.createElement('main');
    const renderFunction = () => {
      ReactDOM.render((
        <Timeline
          days={timelineFixture}
          selectedDay={timelineFixture[timelineFixture.length - 1]}
        />
      ), root);
    };

    expect(renderFunction).not.toThrow();
  });

  it('should contain 3 entries', () => {
    const timeline = render(
      <Timeline
        days={timelineFixture}
        selectedDay={timelineFixture[3]}
      />,
    );

    const selector = timeline.find('.timeline__day');

    expect(selector.length).toBe(3);
  });

  it('should render dummy records before first entry and after last entry', () => {
    const timeline = render(
      <Timeline
        days={timelineFixture.slice(0, 1)}
        selectedDay={timelineFixture[0]}
      />,
    );

    const selector = timeline.find('.timeline__day');
    const dummyTest = /timeline__day--dummy/;

    expect(selector[0].attribs.class).toMatch(dummyTest);
    expect(selector[1].attribs.class).not.toMatch(dummyTest);
    expect(selector[2].attribs.class).toMatch(dummyTest);
  });

  it('should call onDaySelect on left swipe gesture', () => {
    const selectDayMock = jest.fn();

    const timeline = mount(
      <Timeline
        days={timelineFixture}
        selectedDay={timelineFixture[3]}
        onDaySelect={selectDayMock}
      />,
    );

    const selector = timeline.find('.timeline');
    simulateSwipe(selector, 'left');

    expect(selectDayMock).toBeCalled();
    expect(selectDayMock).toBeCalledWith(timelineFixture[4]);
  });

  it('should call onDaySelect on right swipe gesture', () => {
    const selectDayMock = jest.fn();

    const timeline = mount(
      <Timeline
        days={timelineFixture}
        selectedDay={timelineFixture[3]}
        onDaySelect={selectDayMock}
      />,
    );

    const selector = timeline.find('.timeline');
    simulateSwipe(selector, 'right');

    expect(selectDayMock).toBeCalled();
    expect(selectDayMock).toBeCalledWith(timelineFixture[2]);
  });

  it('should not call onDaySelect on swipe gestures when entry is either first or last', () => {
    const selectDayMock = jest.fn();

    const timeline = mount(
      <Timeline
        days={timelineFixture.slice(0, 1)}
        selectedDay={timelineFixture[0]}
        onDaySelect={selectDayMock}
      />,
    );

    const selector = timeline.find('.timeline');
    simulateSwipe(selector, 'right');
    simulateSwipe(selector, 'left');

    expect(selectDayMock).not.toBeCalled();
  });

  it('should display date in proper format', () => {
    const timeline = mount(
      <Timeline
        days={timelineFixture}
        selectedDay={timelineFixture[timelineFixture.length - 2]}
      />,
    );

    const selector = timeline.find('.timeline__date');

    expect(selector.at(2).text()).toMatch('Today');
    expect(selector.at(1).text()).toMatch('Yesterday');
    expect(selector.at(0).text()).toMatch(/\d{2} \w{3}/);
  });
});
