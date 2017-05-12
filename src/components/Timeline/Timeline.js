import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import Swipeable from 'react-swipeable';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import cx from 'classnames';

import './Timeline.css';

const withIndexProp = withProps(
  ({ days, selectedDay }) => ({ selectedIndex: days.findIndex(d => d === selectedDay) }),
);

const withViewportHandlers = withHandlers({
  selectNext: ({ selectedIndex, days, changeCentered, onDaySelect }) => (e) => {
    e.preventDefault();
    if (selectedIndex < days.length - 1) {
      onDaySelect(days[selectedIndex + 1]);
    }
  },
  selectPrev: ({ selectedIndex, days, changeCentered, onDaySelect }) => (e) => {
    e.preventDefault();
    if (selectedIndex > 0) {
      onDaySelect(days[selectedIndex - 1]);
    }
  }
});

function formatDate(date) {
  if (isToday(date)) { return 'Today' };
  if (isYesterday(date)) { return 'Yesterday' }

  return format(date, 'DD MMM');
}

function formatDateForUrl(date) {
  return format(date, 'YYYY-MM-DD');
}

const dummy = key => <li className="timeline__day timeline__day--dummy" key={key}></li>;
const timelineEntry = (day, isActive) => (
  <li
    key={day.date}
    className={cx('timeline__day', {
      'timeline__day--regular': !isActive,
      'timeline__day--selected': isActive,
    })}
  >
    <a role="button" className="timeline__activity" href={`/${formatDateForUrl(day.date)}`}>
      <p className="timeline__date">{formatDate(day.date)}</p>
      <p className="timeline__consumption">
        <span className="timeline__value">{day.consumption}</span>
        <abbr className="timeline__volume">L</abbr>
      </p>
    </a>
  </li>
);

function getTimelineEntries(days, selectedIndex) {
  const result = [];

  for (let i = -1; i <= 1; i += 1) {
    const day = days[selectedIndex + i];
    const isAtEdge = selectedIndex + i === -1 || selectedIndex + i === days.length;
    const isInMiddle = !isAtEdge;

    const entry = isInMiddle
      ? timelineEntry(day, i === 0)
      : dummy(i);

    result.push(entry);
  }

  return result;
}

export function Timeline({ days, selectedIndex, selectNext, selectPrev }) {
  return (
    <nav>
      <Swipeable
        nodeName="ol"
        className="timeline"
        onSwipedLeft={selectNext}
        onSwipedRight={selectPrev}
      >
        {getTimelineEntries(days, selectedIndex)}
      </Swipeable>
    </nav>
  );
}

const enhance = compose(
  withIndexProp,
  withViewportHandlers,
);

export default enhance(Timeline);
