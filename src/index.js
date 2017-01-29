import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {App} from './app';
import xs from 'xstream';

const main = App;

const drivers = {
  props: () => xs.of({
    activeTab: "#bananas"
  }),
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
