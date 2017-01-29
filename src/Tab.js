import {div, p,  ul, li, a, h1, hr} from '@cycle/dom';

export function Tab(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;

  const newValue$ = domSource
          .select('a')
          .events('click')
          .map(ev => ev.target.href.split('/')
               .filter(x => x.match(/^#\w+/))[0]);

  const state$ = props$.map(prop => newValue$.map(val => ({ activeTab: val}))
                            .startWith(prop))
          .flatten()
          .remember();

  const _activeClass = (x,y) => x === y ? 'active' : '';
  const tabItems = [].slice.call(document.getElementsByClassName('cycle-tab'));
  const _tabNavs = (url) =>  tabItems.map((tab) => li(
    { attrs:
      { role: "presentation",
        class: _activeClass(url,tab.dataset.url)
      }
    },[
      a({ attrs:{
        href: tab.dataset.url,
        role: "tab",
        "data-toggle": "tab"
      }}, tab.dataset.title)
    ])
  );
  const _tabContent = (url) => tabItems.map((tab) => div(
    { attrs:
      { role: "tabpanel",
        id:"home",
        class: "tab-pane " + _activeClass(url,tab.dataset.url)
      },
      props: {
        innerHTML: tab.innerHTML
      }
    })
  );

  const vtree$ = state$.map(state => {
            console.log(state);
            return div([
              ul({ attrs: { class: "nav nav-tabs"}}, _tabNavs(state.activeTab)),
              div({ attrs: { class: "tab-content"}}, _tabContent(state.activeTab))
            ]);
          });

  const sinks = {
    DOM: vtree$,
    value: state$.map(state => state.activeTab)
  };

  return sinks;
}
