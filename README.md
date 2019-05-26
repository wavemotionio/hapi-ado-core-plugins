[![Build Status](https://travis-ci.org/wavemotionio/hapi-ado-core-plugins.svg?branch=master)](https://travis-ci.org/wavemotionio/hapi-ado-core-plugins)
[![Greenkeeper badge](https://badges.greenkeeper.io/wavemotionio/hapi-ado-core-plugins.svg)](https://greenkeeper.io/)
![David](https://img.shields.io/david/wavemotionio/hapi-ado-core-plugins.svg)
![David](https://img.shields.io/david/dev/wavemotionio/hapi-ado-core-plugins.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/wavemotionio/hapi-ado-core-plugins.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wavemotionio/hapi-ado-core-plugins/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/wavemotionio/hapi-ado-core-plugins.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wavemotionio/hapi-ado-core-plugins/alerts/)
[![Known Vulnerabilities](https://snyk.io/test/github/wavemotionio/hapi-ado-core-plugins/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wavemotionio/hapi-ado-core-plugins?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/a16842411d134d068e2d/maintainability)](https://codeclimate.com/github/wavemotionio/hapi-ado-core-plugins/maintainability)
[![Inline docs](http://inch-ci.org/github/wavemotionio/hapi-ado-core-plugins.svg?branch=master)](http://inch-ci.org/github/wavemotionio/hapi-ado-core-plugins)

# hapi-ado-core-plugins ![GitHub package.json version](https://img.shields.io/github/package-json/v/wavemotionio/hapi-ado-core-plugins.svg) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![https://nodei.co/npm/hapi-ado-core-plugins.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/hapi-ado-core-plugins.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/hapi-ado-core-plugins)

## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](https://github.com/wavemotionio/hapi-ado-core-plugins/issues)
So that you can quickly stand-up a hapi.js server with a security scheme that leverages the Azure Active Directory Authentication Library, a public health-check route, self-documenting API (hapi-swagger), and server event methods for utilizing pm2 zero downtime deployments.

Common plugins used for Proof of Concepts.

## Installation
1. `npm install hapi-ado-core-plugins --save`
2. register plugin(s) with hapi.js server

### Example
See `./tests/server.js`.


## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/wavemotionio/hapi-ado-core-plugins/issues)

### Development
1. replace config values in tests/server.js
1. `npm run dev`

### Commits
Refer to `./.sgcrc`.

Once changes are staged, instead of `git commit -m "commit message"`, enter `npm run commit` and answer the questions.

or...

Install a cli tool globally that adheres to `@commitlint/config-conventional`, such as: [node-semantic-git-commit-cli](https://github.com/JPeer264/node-semantic-git-commit-cli).

Note: View default [commit types here](https://github.com/JPeer264/node-semantic-git-commit-cli/blob/master/.sgcrc).

## Resources
[hapi.js](https://hapijs.com)
[hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie)
[bassmaster](https://github.com/hapijs/bassmaster)
[hapi-swagger](https://github.com/glennjones/hapi-swagger)
[travis-ci](https://travis-ci.org/)
[semantic-release](https://github.com/semantic-release/semantic-release)
[husky](https://github.com/typicode/husky)
[pm2](https://github.com/Unitech/pm2)
[nginx](https://www.nginx.com/)
[microsoft/azure-devops-node-api](https://github.com/Microsoft/azure-devops-node-api)
[ubuntu/server](https://www.ubuntu.com/server)
