module.exports = function regExpExec(regExp, string) {
    let m;
    let matches = []
    if(!regExp.global){
        return [regExp.exec(string)]
    }

    while ((m = regExp.exec(string)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regExp.lastIndex) {
            regExp.lastIndex++;
        }

        matches.push(m)
    }
    return matches;
};
