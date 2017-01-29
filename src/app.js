import xs from 'xstream';
import { html } from 'snabbdom-jsx';

export function App (sources) {
  const tabHeaders = sources.DOM.select("a").events("click");
  const _activeClass = (x,y) => x === y ? "active" : ""; 
  const tabItems = [].slice.call(document.getElementsByClassName('cycle-tab'));
  const tabContent = tabItems.map((tab) => tab.innerHTML);
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

  const vtree$ = tabHeaders.map(ev => ev.target.href.split("/")
                                .filter(x => x.match(/^#\w+/))[0])
          .startWith("#home")
          .map(url => {
            return (
                <div>
                  <ul className="nav nav-tabs">
                    { _tabNavs(url)}
                  </ul>
                  <div className="tab-content">
                    { _tabContent(url)}
                  </div>
                </div>
            );
          });

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}
