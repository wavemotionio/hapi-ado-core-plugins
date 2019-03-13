const Joi = require('joi'),
    pack = require('../../../package'),
    BassmasterBatch = require('bassmaster/lib/batch');

exports.plugin = {
    name: 'hapi-ado-core-plugins-utilities',
    version: pack.version,
    pkg: pack,
    register: async (server, options) => {
        /* debug code */
        // const testing = async (itemContent) => {
        //     return new Promise(async (resolve, reject) => {
        //         try {
        //             setTimeout(() => {
        //               resolve('success');
        //             }, 10000)

        //         } catch(err) {
        //             reject(err);
        //         }
        //     });
        // };
        // let test = await testing();

        /**
         * Adds public route that returns server status
         * @example <caption>[GET] /utils/health</caption>
         * // returns { running: true, ... }
         * @returns {Object} Returns the health statistics of the server.
         */
        server.route({
            method: 'GET',
            path: '/utils/health',
            options: {
                tags: ['api', 'utils'],
                description: 'Check server health and uptime.'
            },
            handler: (request, h) => (
                {
                    running: true,
                    uptime: process.uptime(),
                    memoryUsage: process.memoryUsage(),
                    versions: process.versions,
                    droneId: process.pid,
                    server: {
                        node: process.version,
                        hapi: request.server.version,
                        host: request.server.info.host,
                        port: request.server.info.port,
                        uri: request.server.info.uri
                    }
                }
            )
        });

        /**
         * Adds public route for batching other endpoints together
         * @example <caption>[GET] /utils/batch</caption>
         * // returns [ endpoint1Response, endpoint2Response ]
         * @returns {Array} Aggregated list of endpoint results.
         */
        if (!options.excludeBatch) {
            const batchRoute = {
                method: 'POST',
                path: '/utils/batch',
                config: BassmasterBatch.config({
                    description: 'Batch endpoints: { "requests": [{ "method": "get", "path": "/b/utils/server" }, { "method": "get", "path": "/b/utils/useragent" }] }',
                    notes: ['{ "requests": [ { "method": "post", "path": "/wiql/Apollo%5CWeb%5CTechnical%20UI/Epic", "payload": { "excludeByParentList": [] } }, { "method": "post", "path": "/wiql/Apollo%5CWeb%5CTechnical%20UI/Feature", "payload": { "excludeByParentList": "$0.ids" } }, { "method": "post", "path": "/wiql/Apollo%5CWeb%5CTechnical%20UI/Product%20Backlog%20Item", "payload": { "excludeByParentList": "$1.ids" } } ] }'],
                    tags: ['api', 'utils']
                })
            };
            // batchRoute.config.validate = {};
            // batchRoute.config.auth = 'token';
            // batchRoute.config.validate.headers = Joi.object({'authorization': Joi.string().required().description('Bearer &lt;token&gt;')}).unknown();
            batchRoute.config.validate.payload = Joi.object().keys({
              requests: Joi.array().required()
            });
            
            server.route(batchRoute);
        }
    }
}
