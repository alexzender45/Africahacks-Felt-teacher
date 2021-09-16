"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HealthController = void 0;

var _base = require("./base.controller");

class HealthController extends _base.BaseController {
  constructor() {
    super();
  }

  check(req, res) {
    try {
      super.success(res, [], 'Health check is working...');
    } catch (e) {
      e.code = 500;
      e.message = 'Error accessing health check...';
      super.error(res, e);
    }
  }

}

exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map