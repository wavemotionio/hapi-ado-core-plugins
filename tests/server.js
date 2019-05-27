const { authAdalWeb, documentation, serverEvents, utilities } = require('../index'),
    Hapi = require('@hapi/hapi'),
    path = require('path'),
    authStrategyName = false;

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000,
    router: {
        stripTrailingSlash: true
    },
    debug: { request: ['error'] }
});

const main = async () => {
    console.log('Server initializing...');

    try {

        if (authStrategyName) {
            await server.register([
                {
                    plugin: authAdalWeb,
                    options: {
                        loginRoute: '/',
                        landingPageRoute: '/docs',
                        cookieKey: 'password-should-be-32-characters',
                        strategyName: authStrategyName,
                        adoServerUrl: 'https://dev.azure.com/<organization>',
                        prodClientId: 'xxx',
                        prodLoginUrl: 'http://localhost:1337',
                        devClientId: 'xxx',
                        devLoginUrl: 'http://localhost:1337',
                        adoApiUrl: 'https://dev.azure.com/<organization>/_apis/projects?api-version=4.0',
                        adoResourceId: '499b84ac-1321-427f-aa17-267ca6975798'
                    }
                }
            ]);
        }

        await server.register([
            {
                plugin: documentation,
                options: {
                    documentationPathRoute: '/'
                }
            },
            {
                plugin: serverEvents
            },
            {
                plugin: utilities,
                options: {
                    repository: {
                        name: 'test-package-name',
                        version: '1.0.5'
                    }
                }
            }
        ]);

    } catch(err) { console.error(err); }

    await server.initialize();

    await server.start();
}

main().catch(console.error);
