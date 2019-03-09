"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWebApi = getWebApi;

var azdev = _interopRequireWildcard(require("azure-devops-node-api"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getWebApi(_x, _x2, _x3) {
  return _getWebApi.apply(this, arguments);
}

function _getWebApi() {
  _getWebApi = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(bearerToken, adoServerUrl, patToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(resolve, reject) {
                var authHandler, azureDevOps;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        authHandler = null;

                        try {
                          if (patToken) {
                            authHandler = azdev.getPersonalAccessTokenHandler(patToken);
                          } else {
                            authHandler = bearerToken ? azdev.getBearerHandler(bearerToken.replace('Bearer ', '')) : null;
                          }

                          azureDevOps = new azdev.WebApi(adoServerUrl, authHandler);
                          resolve(azureDevOps);
                        } catch (err) {
                          reject(err);
                        }

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4, _x5) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getWebApi.apply(this, arguments);
}