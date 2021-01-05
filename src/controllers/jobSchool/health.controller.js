import { BaseController } from './base.controller';

export class HealthController extends BaseController {
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
