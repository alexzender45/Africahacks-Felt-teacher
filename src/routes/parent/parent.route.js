import { Router } from 'express';
import { authenticate, permit } from '../../middleware';
import { ParentController } from '../../controllers/parent';
import { sendCode, cancel } from '../../utils/verifyVonage';
//

const router = Router();
const {
  parentLogin,
  parentLogOut,
  deleteAllParent,
  deleteOneParent,
  readAllParent,
  fetchOneParent,
  register,
  updateParent,
  adminApprovedParents,
  approvedParents

} = new ParentController();

router.route('/login/parent').post(parentLogin);
router.route('/logout/parent').get(authenticate, parentLogOut);
router.route('/sendcode').post(sendCode)
router.route('/cancelparent').get(cancel);
router
  .route('/parents')
  .get(authenticate, permit(['admin']), readAllParent)
  .post(register)
  .delete(authenticate, permit(['admin']), deleteAllParent);

router.route('/parents/approved')
  .get(authenticate, permit(['admin', 'user', 'school', 'parent']), approvedParents)

router
  .route('/parents/:_id')
  .get(authenticate, permit(['admin', 'user', 'school', 'parent']), fetchOneParent)
  .delete(authenticate, permit(['admin', 'parent']), deleteOneParent)
  .put(authenticate, permit(['admin', 'parent']), updateParent)


router.route('/parent/:_id/approve').put(authenticate, permit(['admin']), adminApprovedParents)
export default router;