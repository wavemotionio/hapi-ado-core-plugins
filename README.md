# hapi-ado-core-plugins

Hapi.js plugins to augment Azure DevOps (ADAL-protected) microservers.

## Installation

1. `npm install hapi-ado-core-plugins --save`
2. register plugin(s) with hapi.js server

### Example
```
const Hapi = require('hapi'),
    { authAdalWeb, documentation, utilities } = require('hapi-ado-core-plugins');

const server = new Hapi.Server({
    host: 'localhost',
    port: 1337,
    router: {
        stripTrailingSlash: true
    }
});

const main = async () => {
    try {
        await server.register([
            {
                plugin: authAdalWeb,
                options: {
                    loginRoute: '/',
                    landingPageRoute: '/docs',
                    cookieKey: 'password-should-be-32-characters',
                    strategyName: 'session',
                    adoServerUrl: 'https://dev.azure.com/{organization}',
                    prodClientId: 'xxx',
                    prodLoginUrl: 'https://{subdomain}.azure.com',
                    devClientId: 'xxx',
                    devLoginUrl: 'http://localhost:1337',
                    adoApiUrl: 'https://dev.azure.com/{organization}/_apis/projects?api-version=4.0',
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
                plugin: utilities
            }
        ]);

    } catch(err) { console.error(err); }

    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

main().catch(console.error);
```

## Development

1. `npm run build`
