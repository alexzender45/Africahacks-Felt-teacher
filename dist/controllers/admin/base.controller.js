"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseController = void 0;

class BaseController {
  success(res, data = [], message = '', httpStatus = 200) {
    res.status(httpStatus).send({
      status: 'success',
      message,
      data
    });
  }

  error(res, error) {
    res.status(error.code || 400).json({
      status: 'error',
      message: error.message
    });
  }

}

exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map