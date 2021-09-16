"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwError = throwError;
exports.GenericResponseError = void 0;

class GenericResponseError extends Error {
  constructor(code, message) {
    super(message);
  }

}

exports.GenericResponseError = GenericResponseError;

function throwError(code, message) {
  throw new GenericResponseError(code, message);
}
//# sourceMappingURL=handleErrors.js.map