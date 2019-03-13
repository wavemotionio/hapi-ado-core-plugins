const authAdalWeb = require(__dirname + '/plugins/authentication/index'), // eslint-disable-line
	documentation = require(__dirname + '/plugins/documentation/index'), // eslint-disable-line
	serverEvents = require(__dirname + '/plugins/server-events/index'), // eslint-disable-line
	utilities = require(__dirname + '/plugins/utilities/index'); // eslint-disable-line

module.exports = { authAdalWeb, documentation, serverEvents, utilities };
