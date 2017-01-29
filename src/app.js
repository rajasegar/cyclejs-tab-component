import xs from 'xstream';
import {div, h1, hr} from '@cycle/dom';
import { Tab } from './Tab';

export function App (sources) {
  const tabSources = {DOM: sources.DOM, props: sources.props};
  const tabComponent = Tab(tabSources);
  const tabVDom$ = tabComponent.DOM;
  const tabValue$ = tabComponent.value;

  const vtree$ = xs.combine(tabValue$, tabVDom$)
          .map(([value, tabVDom]) => {
            return div([
              h1("Cyclejs - Tab Component"),
              hr(),
              tabVDom
            ]);
          });

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}
