const { readdirSync } = require('fs');

const getFiles = (path, ending) => {
	return readdirSync(path).filter((f) => f.endsWith(ending));
};

module.exports = {
	readdirSync,
	getFiles,
};
