/**
 * Recursively find the key/value combination
 * inside of an object.
 * 
 * FYI: Relies on strict equality to determine match
 * @param {object} object 
 * @param {string} key 
 * @param {any} value 
 */
module.exports = function findObject(object, key, value){
    const keys = Object.keys(object);

    // check the object directly for the
    // key value
    if(object[key] === value){
        return object;
    }

    // if we don't find it inside this object
    // we loop through all the properties
    // of the object and check if any 
    // of those have the key/value combination
    let foundObject;
    for(var i = 0; i < keys.length; i++){

        // check if the value 
        const subObject = object[keys[i]];
        if(subObject !== null && typeof subObject === 'object'){
            foundObject = findObject(subObject, key, value);
            if(foundObject) break;
        }
    }

    return foundObject;
}
