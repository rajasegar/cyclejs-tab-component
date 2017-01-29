import xs from 'xstream';
import { html } from 'snabbdom-jsx';
import { Tab } from './Tab';

export function App (sources) {
  const tabSources = { DOM: sources.DOM, props: sources.props };
  const tabComponent = Tab(tabSources);
  const tabVDom$ = tabComponent.DOM;
  const tabValue$ = tabComponent.value;


  const vtree$ = xs.combine(tabValue$, tabVDom$)
          .map(([value, tabVDom]) => {
            console.log(value);
            return(
                <div>
                <h1>Cyclejs - Tab Component</h1>
                <hr/>
                { tabVDom }
              </div>
            );
          });

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}
