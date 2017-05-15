import { configure } from '@kadira/storybook';

function loadStories() {
  const context = require.context('../src', true, /\.stories\.js$/);
  context.keys().forEach(filename => context(filename));
}

configure(loadStories, module);
