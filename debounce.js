module.exports = function debounce(func, delay) {
    // save one timeout for each
    // debounce function
    let timeoutId;
    return (...args) => {

        // if the function is called multiple 
        // times we restart the timeout function
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(_ => {
            func(...args);
        },delay);
    };
};


