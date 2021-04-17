import { Router } from 'express';
import { authenticate, permit } from '../../middleware';
import { SchoolController } from '../../controllers/school';
import { sendCode, cancel } from '../../utils/verifyVonage';
import { passwordResetSchool, confirmPasswordReset } from '../../utils/passwordReset'
//

const router = Router();
const {
  schoolLogin,
  schoolLogOut,
  deleteOne,
  fetchOne,
  register,
  update,
  approvedSchools
} = new SchoolController();

router.route('/login/school').post(schoolLogin);
router.route('/logout/school').get(authenticate, schoolLogOut);
router.route('/sendcode').post(sendCode);
router.route('/cancelschool').get(cancel);
router.route('/reset-password/school').post(passwordResetSchool);
router.route('/change-password/school').post(confirmPasswordReset)
router
  .route('/schools')
  .post(register)

router.route('/schools/approved')
  .get(authenticate, permit(['user', 'school', 'parent']), approvedSchools)

router
  .route('/schools/:_id')
  .get(authenticate, permit(['user', 'school', 'parent']), fetchOne)
  .delete(authenticate, permit(['school']), deleteOne)
  .put(authenticate, permit(['school']), update)
export default router;