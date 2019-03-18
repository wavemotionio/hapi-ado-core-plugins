const { authAdalWeb, documentation, serverEvents, utilities } = require('../index'),
    Hapi = require('hapi'),
    path = require('path');

const server = new Hapi.Server({
    host: 'localhost',
    port: 1337,
    router: {
        stripTrailingSlash: true
    },
    debug: { request: ['error'] }
});

const main = async () => {
    console.log('Server initializing...');

    try {
        await server.register([
            {
                plugin: authAdalWeb,
                options: {
                    loginRoute: '/',
                    landingPageRoute: '/docs',
                    cookieKey: 'password-should-be-32-characters',
                    strategyName: 'session',
                    adoServerUrl: 'https://dev.azure.com/<organization>',
                    prodClientId: 'xxx',
                    prodLoginUrl: 'http://localhost:1337',
                    devClientId: 'xxx',
                    devLoginUrl: 'http://localhost:1337',
                    adoApiUrl: 'https://dev.azure.com/<organization>/_apis/projects?api-version=4.0',
                    adoResourceId: '499b84ac-1321-427f-aa17-267ca6975798'
                }
            },
            {
                plugin: documentation,
                options: {
                    documentationPathRoute: '/docs'
                }
            },
            {
                plugin: serverEvents
            },
            {
                plugin: utilities
            }
        ]);

        server.route([
            {
                method: 'GET',
                path: '/a/b/c/d', 
                config: {
                    auth: 'session'
                },
                handler: async (request, h) => {
                    return 'success'
                },
            },
            {
                method: 'GET',
                path: '/e/f', 
                config: {
                    auth: 'session'
                },
                handler: async (request, h) => {
                    return 'success'
                }
            },
            {
                method: 'GET',
                path: `/files/{param*}`,
                config: {
                    auth: 'session'
                },
                handler: {
                    directory: {
                        path: `${path.join(__dirname, '../test')}`,
                        redirectToSlash: false,
                        index: true,
                        listing: true
                    }
                }
            }
        ]);

    } catch(err) { console.error(err); }

    await server.initialize();

    await server.start();
}

main().catch(console.error);
