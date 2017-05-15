import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Timeline from './Timeline';
import timelineFixture from './timeline.fixtures';

storiesOf('Timeline', module)
  .add('today', () => (
    <Timeline
      days={timelineFixture}
      selectedDay={timelineFixture[timelineFixture.length - 1]}
      onDaySelect={action('day selected')}
    />
  ))
  .add('middle', () => (
    <Timeline
      days={timelineFixture}
      selectedDay={timelineFixture[2]}
      onDaySelect={action('day selected')}
    />
  ))
  .add('first day', () => (
    <Timeline
      days={timelineFixture}
      selectedDay={timelineFixture[0]}
      onDaySelect={action('day selected')}
    />
  ))
  .add('one day', () => (
    <Timeline
      days={timelineFixture.slice(-1)}
      selectedDay={timelineFixture[timelineFixture.length - 1]}
      onDaySelect={action('day selected')}
    />
  ));
