const authAdalWeb = require(__dirname + '/plugins/authentication/index'),
	documentation = require(__dirname + '/plugins/documentation/index'),
	utilities = require(__dirname + '/plugins/utilities/index');

module.exports = { authAdalWeb, documentation, utilities };
