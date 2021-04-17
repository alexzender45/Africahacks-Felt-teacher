import { Router } from 'express';
import { authenticate, permit } from '../../middleware';
import { ParentController } from '../../controllers/parent';
import { sendCode, cancel } from '../../utils/verifyVonage';
import { passwordResetParent, confirmPasswordReset } from '../../utils/passwordReset';
//

const router = Router();
const {
  parentLogin,
  parentLogOut,
  deleteOneParent,
  fetchOneParent,
  register,
  updateParent,
  approvedParents

} = new ParentController();

router.route('/login/parent').post(parentLogin);
router.route('/logout/parent').get(authenticate, parentLogOut);
router.route('/sendcode').post(sendCode);
router.route('/cancelparent').get(cancel);
router.route('/reset-password/parent').post(passwordResetParent);
router.route('/change-password/parent').post(confirmPasswordReset)
router
  .route('/parents')
  .post(register)

router.route('/parents/approved')
  .get(authenticate, permit(['admin', 'user', 'school', 'parent']), approvedParents)

router
  .route('/parents/:_id')
  .get(authenticate, permit(['admin', 'user', 'school', 'parent']), fetchOneParent)
  .delete(authenticate, permit(['admin', 'parent']), deleteOneParent)
  .put(authenticate, permit(['admin', 'parent']), updateParent)
export default router;