module.exports = function flatten(array){
    return array.reduce((prev, cur) => {
        if(cur instanceof Array){
            prev.push(...flatten(cur));
        }else{
            prev.push(cur)
        }
        return prev;
    }, [])
}