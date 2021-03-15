import { Router } from 'express';
import { Connect } from '../../controllers/parent';
import { authenticate, permit } from '../../middleware';

const router = Router();
const { 
connectWithApprovedParent
} = new Connect();


router
  .route('/parents/:_id/connect')
  .post(authenticate, permit(['admin', 'user', 'school', 'parent']), connectWithApprovedParent)
  export default router;