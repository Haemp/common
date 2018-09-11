module.exports = function overwriteNoOp(overrideClass, noopCallback ){

    noopCallback = noopCallback || function(){};
    const classPrototype = overrideClass.prototype;
    
    // override every method on the class except for the constructor
    const methodsToOverride =Object.getOwnPropertyNames(classPrototype).filter(name => !name.includes('constructor'))
    
    // create a new class with noop functions with the same signatures
    const newClass = class NewPrototype{};
    const newPrototype = newClass.prototype;
    methodsToOverride.forEach(name => {
        if(typeof classPrototype[name] === 'function'){
            newPrototype[name] = noopCallback;
        }
    })
    
    return newClass;
}