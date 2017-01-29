# cyclejs-tab-component
A declarative approach for creating Bootstrap tab components using Cyclejs

## Demo
- [View Demo](http://feeble-sail.surge.sh/)

### Dependencies
- [Bootstrap](https://getbootstrap.com)
- [Cyclejs](https://cyclejs.org)

## How it works?
This will take a simple HTML markup and convert this into a reactive Cyclejs Tab component.

### HTML markup
```html
<div class="cycle-tabset">
  <div class="cycle-tab" data-title="Home" data-url="#home">
    <h1>Home</h1>
    <p>This is home content</p>
  </div>
  <div class="cycle-tab" data-title="Profile" data-url="#profile">
    <h1>Profile</h1>
    <p>This is profile content</p>
  </div>
  <div class="cycle-tab" data-title="Settings" data-url="#settings">
    <h1>Settings</h1>
    <p>This is settings content</p>
  </div>
  <div class="cycle-tab" data-title="Messages" data-url="#messages">
    <h1>Messages</h1>
    <p>This is messages content</p>
  </div>
</div>
```
## Motivation
- To Create declarative Tab components 
- Make use of Bootstrap CSS framework for styling
- Moving away from Bootstrap JS and jQuery
- Using more functional and reactive approach for components


## To-do
- Create a separate npm package
- Write tests
- Using multiple instances in a single page/app
