[![Build Status](https://travis-ci.org/wavemotionio/hapi-ado-core-plugins.svg?branch=master)](https://travis-ci.org/wavemotionio/hapi-ado-core-plugins)
![npm (tag)](https://img.shields.io/npm/v/hapi-ado-core-plugins/latest.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/wavemotionio/hapi-ado-core-plugins.svg)
![David](https://img.shields.io/david/wavemotionio/hapi-ado-core-plugins.svg)
![David](https://img.shields.io/david/dev/wavemotionio/hapi-ado-core-plugins.svg)

[![https://nodei.co/npm/hapi-ado-core-plugins.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/hapi-ado-core-plugins.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/hapi-ado-core-plugins)

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/wavemotionio/hapi-ado-core-plugins/issues)

# hapi-ado-core-plugins

## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](https://github.com/wavemotionio/hapi-ado-core-plugins/issues)
Hapi.js plugins to augment Azure DevOps (ADAL-protected) microservers.  This package allows developers to quickly stand-up a hapi.js server with a security scheme that leverages the Azure Active Directory Authenitcation Library, a public health-check route, self-documenting API (hapi-swagger), and server event methods for utilizing pm2 zero downtime deployments.

## Installation

1. `npm install hapi-ado-core-plugins --save`
2. register plugin(s) with hapi.js server

### Example
```
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

```

## Development

1. replace config values in tests/server.js
1. `npm run dev`

## To-Dos
1. https://www.npmjs.com/package/goodparts
1. https://snyk.io/
1. https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration