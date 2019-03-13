const pack = require('../../../package');

exports.plugin = {
    name: 'hapi-ado-core-plugins-server-events',
    version: pack.version,
    pkg: pack,
    register: async (server, options) => {

        /**
         * Adds process for handling rejections
         * @example <caption>Unhandled Errors</caption>
         * @returns {Object} process.exit(1)
         */
        process.on('unhandledRejection', (err) => {
            server.log(['error', 'hapi', 'unhandledRejection'], err);

            process.exit(1);
        });

        /**
         * Adds process for graceful shutdowns
         * @example <caption>Allows the hapi.js server to shutdown gracefully.</caption>
         * @returns {Object} process.exit(0)
         */
        process.on('SIGINT', async () => {
            server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...');
            await server.stop({ timeout: 30000 });
            server.log(['info', 'pm2', 'shutdown'], 'hapi stopped');

            return process.exit(0);
        });

        /**
         * Notifies pm2 when the server has finished starting up.
         * @example <caption>Allows the hapi.js server to gracefully reload changes.</caption>
         * @returns {Object} process.send('ready')
         */
        server.events.on('start', (err) => {
            if (process.env.NODE_ENV != 'dev') {
                process.send('ready');
                server.log(['info', 'pm2', 'ready'], 'hapi ready');
            } else {
                console.log(`Server running at: ${server.info.uri}`);
            }
        });
    }
}
