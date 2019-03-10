const pack = require('../../../package');

exports.plugin = {
    name: 'hapi-ado-core-plugins-server-events',
    version: pack.version,
    pkg: pack,
    register: async (server, options) => {
        process.on('unhandledRejection', (err) => {
            server.log(['error', 'hapi', 'unhandledRejection'], err);

            process.exit(1);
        });

        process.on('SIGINT', async () => {
            server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...');
            await server.stop({ timeout: 30000 });
            server.log(['info', 'pm2', 'shutdown'], 'hapi stopped');

            return process.exit(0);
        });

        server.events.on('start', (err) => {
            if (!process.env.NODE_ENV === 'dev') {
                process.send('ready');
                server.log(['info', 'pm2', 'ready'], 'hapi ready');
            } else {
                console.log(`Server running at: ${server.info.uri}`);
            }
        });
    }
}
