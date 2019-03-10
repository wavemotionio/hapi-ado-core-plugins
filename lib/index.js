const authAdalWeb = require(__dirname + '/plugins/authentication/index'),
	documentation = require(__dirname + '/plugins/documentation/index'),
	serverEvents = require(__dirname + '/plugins/server-events/index'),
	utilities = require(__dirname + '/plugins/utilities/index');

module.exports = { authAdalWeb, documentation, serverEvents, utilities };
