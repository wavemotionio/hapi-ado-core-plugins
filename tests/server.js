const { authAdalWeb, documentation, serverEvents, utilities } = require('../index'),
    Hapi = require('hapi');

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
                    adoResourceId: 'xxx'
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

    } catch(err) { console.error(err); }

    await server.initialize();

    await server.start();
}

main().catch(console.error);
