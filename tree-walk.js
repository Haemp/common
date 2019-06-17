/**
 * @param {Array} tree
 */
module.exports = function treeWalk(tree, childrenKey, callback){

    function innerFilter(node, parentNode){

        // if this node has a child key
        // we trigger a recursive search
        // down this path
        if(node[childrenKey] instanceof Array){
            node[childrenKey].forEach(childNode => {
                innerFilter(childNode, node)  
            })
        }
        callback(node, parentNode)
    }

    tree.forEach(node => innerFilter(node));
}