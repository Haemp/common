
export default function filterNode({node, search, childrenKey, searchKey}){

    const filteredNode = Object.assign({}, node);    
    function innerFilter(node){
        if(node[childrenKey]){
            
            node[childrenKey] = node[childrenKey].filter(child => innerFilter(child))
            return (node[childrenKey].length > 0)
        }else{
            return node[searchKey].includes(search)
        }    
    }

    innerFilter(filteredNode);
    return filteredNode;
}