module.exports = {
	transform: {
		'^.+\\.jsx?$': 'babel-jest'
	},
	moduleNameMapper: {
		'\\.(css|less|scss)$': 'identity-obj-proxy'
	}
};
