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


## ViewStack
Custom element tabbed view. Does the job, nothing fancy - totally standard.

```javascript
import ViewStack from './node_modules/common/view-stack.js';

document.body.innerHTML = `
  <c-view-stack default-tab="1">
    <div tab-id="1" tab-name="First" slot="tabs">First Tab</div>
    <div tab-id="2" tab-name="First" slot="tabs">Second Tab</div>
  </c-view-stack>
`;
```

## EventEmitter
Follows the EventTarget spec

```javascript
import EventEmitter from './node_modules/common/event-emitter.js';

class Model extends EventEmitter{
    onData(newData){
        this.dispatchEvent(new CustomEvent('data', {detail: newData}))
    }
}

const model = new Model();
model.addEventListener('data', evt => console.log(evt), {once: true});
```
