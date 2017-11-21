# Common
Answer to the question - "Didn't I implement this before?"

# Usage
```
npm i Haemp/common -S
```

```javascript
import all from './node_modules/common/all.js';
all(element1, element2).addEventListener('click', console.log); 
```

# Stuff

## all()
Syntactic sugar for calling a method or getting a property on a set of objects without looping. Uses an ES6 Proxy.

```javascript
import all from './node_modules/common/all.js';
all(element1, element2).addEventListener('click', console.log);
```


## Tabbed View
Custom element tabbed view. Does the job, nothing fancy - totally standard.

```javascript
import TabbedView from './node_modules/common/tabbed-view.js';

document.body.innerHTML = `
  <c-tabbed-view default-tab="1">
    <div tab-id="1" slot="tabs">First Tab</div>
    <div tab-id="2" slot="tabs">Second Tab</div>
  </c-tabbed-view>
`;
```
