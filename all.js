/**
 * @param {mixed} objects
 * @returns {Proxy}
 */
export default function all(...objects) {
    return new Proxy({}, {
        get: function(target, property) {
            const isFunction = typeof objects[0][property] === 'function';
            if(isFunction){
                return function(){
                    let args = arguments;
                    return objects.map(object => object[property].apply(object, args));
                }
            }else{
                return objects.map(object => object[property])
            }
        }
    });
}
