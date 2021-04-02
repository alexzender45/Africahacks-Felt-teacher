import { Router } from 'express';
import { authenticate, permit } from '../../middleware';
import { SchoolController } from '../../controllers/school';
import { sendCode, cancel } from '../../utils/verifyVonage'
//

const router = Router();
const {
  schoolLogin,
  schoolLogOut,
  deleteAllSchool,
  deleteOne,
  readAllSchool,
  fetchOne,
  register,
  update,
  adminApprovedSchools,
  approvedSchools

} = new SchoolController();

router.route('/login/school').post(schoolLogin);
router.route('/logout/school').get(authenticate, schoolLogOut);
router.route('/sendcode').post(sendCode)
router.route('/cancelschool').get(cancel);
router
  .route('/schools')
  .get(authenticate, permit(['admin']), readAllSchool)
  .post(register)
  .delete(authenticate, permit(['admin']), deleteAllSchool);

router.route('/schools/approved')
  .get(authenticate, permit(['admin', 'user', 'school', 'parent']), approvedSchools)

router
  .route('/schools/:_id')
  .get(authenticate, permit(['admin', 'user', 'school', 'parent']), fetchOne)
  .delete(authenticate, permit(['admin', 'school']), deleteOne)
  .put(authenticate, permit(['admin', 'school']), update)


router.route('/school/me/approve').put(authenticate, permit(['admin']), adminApprovedSchools)
export default router;