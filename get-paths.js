/**
 * Split all folders in a path into an array
 * 
 * @param {String} path 
 * @return Object
 */
module.exports = function getPaths(path) {
	const parts = path.split(/(.*?[\\\/]+)/);
	const paths = [path];
	const seqments = [parts[parts.length - 1]];
	let part = parts[parts.length - 1];
	path = path.substr(0, path.length - part.length - 1);
	paths.push(path);
	for(let i = parts.length - 2; i > 2; i -= 2) {
		part = parts[i];
		path = path.substr(0, path.length - part.length) || "/";
		paths.push(path);
		seqments.push(part.substr(0, part.length - 1));
	}
	part = parts[1];
	seqments.push(part.length > 1 ? part.substr(0, part.length - 1) : part);
	return {
		paths: paths,
		seqments: seqments
	};
};