const pack = require('../../../package'),
    Inert = require('inert'),
    Vision = require('vision'),
    Handlebars = require('handlebars'),
    HapiSwagger = require('hapi-swagger');

exports.plugin = {
    name: 'hapi-ado-core-plugins-documentation',
    version: pack.version,
    register: async (server, options) => {
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: {
                    pathPrefixSize: 1,
                    info: {
                        title: 'API Documentation',
                        description: 'Live testing of documented endpoints below.',
                        version: pack.version
                    },
                    schemes: process.env.NODE_ENV === 'dev' ? ['http'] : ['https'],
                    jsonEditor: false,
                    documentationPage: false,
                    documentationPath: options.documentationPathRoute,
                    swaggerUI: true
                }
            }
        ]);

        server.views({
            engines: {
                html: Handlebars
            },
            relativeTo: __dirname,
            path: './'
        });

        server.route([
            {
                method: 'GET',
                path: options.documentationPathRoute, 
                config: {
                    auth: 'session'
                },
                handler: (request, h) => {
                    var context = {
                        scopeTags: ['api']
                    };

                    return h.view('apiDocs', context);
                }
            }
        ]);
    }
}
