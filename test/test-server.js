const Lab = require('lab');
const Code = require('code');
const Path = require('path');
const Hapi = require('@hapi/hapi');

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script());

// shortcuts from lab
const { describe, it } = lab;

// shortcuts from code
const expect = Code.expect;

describe('inject requests with server.inject,', () => {

    it('inject a request', async () => {
        const server = new Hapi.Server();

        server.route({
            method: 'GET',
            path: '/',
            handler: () => {
                return {
                    name: 'Testing server',
                    success: true
                }
            }
        });

        // these must match the route you want to test
        const injectOptions = {
            method: 'GET',
            url: '/'
        };

        // wait for the response and the request to finish
        const response = await server.inject(injectOptions);

        // alright, set your expectations :)
        expect(response.statusCode).to.equal(200);

        // shortcut to payload
        const payload = JSON.parse(response.payload);
        expect(payload.success).to.equal(true);

        // of course you can assign more “expect” statements
    });
});
