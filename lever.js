/** 
 * A lever is a promise that is only resolvable and 
 * that attaches the fulfill function to itself for
 * ease of use.
 * 
 * Use in cases of non-reversable state change:
 * ```javascript
 *      // create a lever and add it to the image
 *      image.wasLoaded = getLever();
 * 
 *      // a parent can then wait like this
 *      await image.wasLoaded
 * 
 *      // the lever is easily fulfilled like so:
 *      image.wasLoaded.fulfill();
 * 
 *      // all subsequent calls to queue up 
 *      // actions after the image was loaded
 *      // will then be resolved immediately
 * ```
 */
module.exports = function getLever(){
    let fulfill;
    let res;
    let rej
    const p = new Promise((resolve, reject) => {
        fulfill = resolve;
        res = resolve;
        rej = reject;        
    })
    p.fulfill = fulfill;
    p.resolve = res;
    p.reject = rej;
    
    return p;
}