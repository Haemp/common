/**
 * @description
 * Filters a given tree structure and returns a new object with only
 * the filtered items in it.
 * 
 * It only filters out objects if all of their children returns a negative
 * filter condition.
 * 
 * @usage
 * Given the tree data:
 * const data = {
 *      title: 'Foo',
 *      children: [
 *          title: 'Bar',
 *          children: [
 *              title: 'Baz'
 *          ]   
 *      ]
 * }
 * 
 * Applying the filter:
 * filterNode({node: data, childrenKey: 'children', filterFunc: (node) => {
 *      node.title === 'Baz'
 * }})
 * 
 * returns:
 * {
 *      title: 'Foo',
 *      children: [
 *          title: 'Bar',
 *          children: [
 *              title: 'Baz'
 *          ]   
 *      ]
 * }
 * 
 * Applying the filter:
 * filterNode({node: data, childrenKey: 'children', filterFunc: (node) => {
 *      node.title === 'Foo'
 * }})
 * 
 * returns:
 * {
 *      title: 'Foo',
 * }
 */
module.exports = function filterNode({node, childrenKey, filterFunc}){

    // Copy the root node
    const filteredNode = Object.assign({}, node);    
    function innerFilter(node){
        if(node[childrenKey]){
            
            node[childrenKey] = node[childrenKey].filter(child => innerFilter(child))
            return (node[childrenKey].length > 0)
        }else{
            return filterFunc(node)
        }    
    }

    innerFilter(filteredNode);
    return filteredNode;
}