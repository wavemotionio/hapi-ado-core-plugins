[![Build Status](https://travis-ci.org/wavemotionio/hapi-ado-core-plugins.svg?branch=master)](https://travis-ci.org/wavemotionio/hapi-ado-core-plugins)
![GitHub package.json version](https://img.shields.io/github/package-json/v/wavemotionio/hapi-ado-core-plugins.svg)
![David](https://img.shields.io/david/wavemotionio/hapi-ado-core-plugins.svg)
![David](https://img.shields.io/david/dev/wavemotionio/hapi-ado-core-plugins.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/wavemotionio/hapi-ado-core-plugins/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wavemotionio/hapi-ado-core-plugins?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/a16842411d134d068e2d/maintainability)](https://codeclimate.com/github/wavemotionio/hapi-ado-core-plugins/maintainability)
[![Inline docs](http://inch-ci.org/github/wavemotionio/hapi-ado-core-plugins.svg?branch=master)](http://inch-ci.org/github/wavemotionio/hapi-ado-core-plugins)

[![https://nodei.co/npm/hapi-ado-core-plugins.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/hapi-ado-core-plugins.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/hapi-ado-core-plugins)

# hapi-ado-core-plugins

## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](https://github.com/wavemotionio/hapi-ado-core-plugins/issues)
So that you can quickly stand-up a hapi.js server with a security scheme that leverages the Azure Active Directory Authentication Library, a public health-check route, self-documenting API (hapi-swagger), and server event methods for utilizing pm2 zero downtime deployments. This package exists to serve as the core server plugins for standing up a full-stack javascript application.

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
1. https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration
1. add linting CI
1. add tests (coverage badge) CI

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/wavemotionio/hapi-ado-core-plugins/issues)