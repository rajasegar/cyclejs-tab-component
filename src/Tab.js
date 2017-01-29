import { html } from 'snabbdom-jsx';

export function Tab(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;

  const newValue$ = domSource
          .select("a")
          .events("click")
          .map(ev => ev.target.href.split("/")
               .filter(x => x.match(/^#\w+/))[0]
              );

  const state$ = props$.map(props => newValue$.map(val => ({ activeTab: val}))
                            .startWith(props))
          .flatten()
          .remember();

  const _activeClass = (x,y) => x === y ? "active" : ""; 
  const tabItems = [].slice.call(document.getElementsByClassName('cycle-tab'));
  const _tabNavs = (url) =>  tabItems.map((tab) => {
    return (
        <li attrs-role='presentation' className={_activeClass(url, tab.dataset.url)}>
        <a href={tab.dataset.url} attrs-role='tab' attrs-data-toggle='tab' attrs-aria-controls={tab.dataset.title}>
            { tab.dataset.title }
          </a>
        </li>
    );
  });

  const _tabContent = (url) => tabItems.map((tab) => {
    return(
        <div
          attrs-role='tabpanel'
          id={tab.dataset.url.slice(1)}
          className={ 'tab-pane ' + _activeClass(url, tab.dataset.url)}
          innerHTML={tab.innerHTML}>
        </div>
    );
  });

  const vtree$ = state$.map(state => {
    console.log(state);
    return (
        <div>
        <ul className="nav nav-tabs">
        { _tabNavs(state.activeTab)}
      </ul>
        <div className="tab-content">
        { _tabContent(state.activeTab)}
      </div>
        </div>
    );
  });

  const sinks = {
    DOM: vtree$,
    value: state$.map(state => state.activeTab)
  };

  return sinks;
}
