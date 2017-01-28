import {div, p,  ul, li, a, h1} from '@cycle/dom';
import xs from 'xstream';
// import { html } from 'snabbdom-jsx';

export function App (sources) {
  const tabHeaders = sources.DOM.select("a").events("click");
  const _activeClass = (x,y) => x === y ? "active" : ""; 
  const tabItems = [].slice.call(document.getElementsByClassName('cycle-tab'));
  const tabContent = tabItems.map((tab) => tab.innerHTML);
  const tabNavs = (url) =>  tabItems.map((tab) => li(
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

  const vtree$ = tabHeaders.map(ev => ev.target.href.split("/")
                                .filter(x => x.match(/^#\w+/))[0])
          .startWith("#home")
          .map(url => {
            console.log(url);
            return div([
              ul({ attrs: { class: "nav nav-tabs"}}, tabNavs(url)),
              div({ attrs: { class: "tab-content"}}, _tabContent(url))
            ]);
          });

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}
/*
            return (
      <div>
        <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className={ _activeClass(url, "#home") }><a href="#home" ariaControls="home" role="tab" dataToggle="tab">Home</a></li>
                <li role="presentation" className={ _activeClass(url, "#profile")}><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
                <li role="presentation" className={ _activeClass(url, "#messages")}><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
                <li role="presentation" className={ _activeClass(url, "#settings")}><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
        </ul>

        <div className="tab-content">
                <div role="tabpanel" className={ "tab-pane " + _activeClass(url, '#home')} id="home">
            <h1>Home</h1>
            <p>This is home tab</p>
          </div>
                <div role="tabpanel" className={ "tab-pane " + _activeClass(url, "#profile")} id="profile">
            <h1>Profile</h1>
            <p>This is profile tab</p>
          </div>
                <div role="tabpanel" className={ "tab-pane " + _activeClass(url, "#messages")} id="messages">
            <h1>Messages</h1>
            <p>This is messages tab</p>
          </div>
                <div role="tabpanel" className={ "tab-pane " + _activeClass(url, "#settings")} id="settings">
            <h1>Settings</h1>
            <p>This is settings tab</p>
          </div>
          </div>
      </div>
            );
             */
