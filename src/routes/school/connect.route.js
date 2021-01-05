import { Router } from 'express';
import { Connect } from '../../controllers/school';
import { authenticate, permit } from '../../middleware';

const router = Router();
const { 
connectWithApprovedSchool
} = new Connect();


router
  .route('/schools/:_id/connect')
  .post(authenticate, permit(['admin', 'user', 'school']), connectWithApprovedSchool)
  export default router;