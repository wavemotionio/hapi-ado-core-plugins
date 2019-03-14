const pack = require('../../../package'),
    Vision = require('vision'),
    Handlebars = require('handlebars'),
    HapiAuthCookie = require('hapi-auth-cookie'),
    WebApi = require('../../../bin/azureDevOps/webApi')
    Boom = require('boom'),
    Joi = require('joi'),
    isDev = process.env.NODE_ENV === 'dev';

exports.plugin = {
    name: 'hapi-ado-core-plugins-auth',
    version: pack.version,
    register: async (server, options) => {
        const loginRoute = options.loginRoute, // '/'
            cookieKey = options.cookieKey,  // 'x1dfx35dfgyoxebex3dfx35y7jpfjh3e3'
            landingPageRoute = options.landingPageRoute,  // '/dev'
            strategyName = options.strategyName, // 'session'
            adoServerUrl = options.adoServerUrl,
            appConfig = {
                clientId: !isDev ? options.prodClientId : options.devClientId,
                loginUrl: !isDev ? options.prodLoginUrl : options.devLoginUrl,
                adoApiUrl: options.adoApiUrl,
                adoResourceId: options.adoResourceId
            },
            stateFEcookie = 'sessionId',
            cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });

        let uuid = 1;

        await server.register([Vision, HapiAuthCookie]);

        server.views({
            engines: {
                html: Handlebars
            },
            relativeTo: __dirname,
            path: './'
        });

        server.app.cache = cache;

        server.auth.strategy(strategyName, 'cookie', {
            password: cookieKey,
            cookie: stateFEcookie,
            redirectTo: loginRoute,
            appendNext: true,
            isSecure: process.env.NODE_ENV != 'dev',
            clearInvalid: true,
            isHttpOnly: false,
            validateFunc: async (request, session) => {
                let authorized = false;

                const cached = await cache.get(session.sid),
                    out = {
                        valid: !!cached
                    };

                if (out.valid) {
                    let VSTSConnection = await WebApi.getWebApi(cached.token, adoServerUrl);

                    try {
                        authorized = await VSTSConnection.getGitApi();
                    }

                    catch(err) {
                        authorized = false;
                    }

                    out.valid = authorized ? true : false;
                    out.credentials = cached.token;
                }

                return out;
            }
        });

        const login = async (request, h) => {
                let authorized = null;

                if (request.auth.isAuthenticated) {
                    return h.redirect(request.query.next)
                }

                if (request.method === 'post') {

                    let VSTSConnection = await WebApi.getWebApi(request.headers.authorization, adoServerUrl);

                    try {
                        authorized = await VSTSConnection.getGitApi();
                    } catch(err) {
                        authorized = false;
                    }

                    if (authorized) {
                        const sid = String(++uuid);

                        await request.server.app.cache.set(sid, { token: request.headers.authorization }, 0);
                        request.cookieAuth.set({ sid });

                        return { status: 'success', next: `${request.query.r || landingPageRoute}`, token: request.headers.authorization };
                    
                    } else {
                        return Boom.unauthorized();
                    }
                }

                if (request.method === 'get') {
                    return h.view('login', {
                            appConfig
                        });
                }
            },

            logout = (request, h) => {
                request.server.app.cache.drop(request.state[stateFEcookie].sid);
                request.cookieAuth.clear();

                return h.redirect(loginRoute);
            };

        server.route([
            {
                method: ['GET', 'POST'],
                path: loginRoute + '{param*}',
                config: {
                    handler: login,
                    auth: {
                      mode: 'try',
                      strategy: strategyName
                    },
                    plugins: {
                      'hapi-auth-cookie': {
                          redirectTo: false
                      }
                    }
                }
            },
            {
                method: 'GET',
                path: loginRoute + 'logout',
                config: {
                  handler: logout,
                  auth: strategyName
                }
            },
            {
                method: 'GET',
                path: '/auth/getAToken', 
                config: {
                    auth: 'session',
                    tags: ['api', 'auth'],
                    description: 'Get jwt token from sesssion',
                    notes: ['This route will return a token to be used as an authentication bearer for all other routes.'],
                    response: { schema: Joi.string().required() }
                },
                handler: async (request, h) => {
                    try {
                        return request.auth.credentials;
                    }

                    catch(err) {
                        return Boom.unauthorized(err);
                    }
                }
            }
        ]);
    }
}
