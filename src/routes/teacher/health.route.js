import { Router } from 'express';
import { HealthController } from '../../controllers/teacher';

const router = Router();
const health = new HealthController();

router.route('/health').get(health.check);

export default router;
