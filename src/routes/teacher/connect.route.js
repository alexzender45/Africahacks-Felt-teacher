import { Router } from 'express';
import { Connect } from '../../controllers/teacher';
import { authenticate, permit } from '../../middleware';

const router = Router();
const { 
connectWithApprovedTeacher
} = new Connect();


router
  .route('/teachers/:_id/connect')
  .post(authenticate, permit(['admin', 'user', 'school', 'parent']), connectWithApprovedTeacher)
  export default router;