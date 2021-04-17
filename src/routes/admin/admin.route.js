import { Router } from 'express';
import { AdminController } from '../../controllers/admin';
import { authenticate, permit } from '../../middleware';
//

const router = Router();
const {
  registerAdmin,
  adminLogin,
  adminLogout,
  deleteAllParent,
  deleteOneParent,
  readAllParent,
  fetchOneParent,
  adminApprovedParents,
  approvedParents,
  deleteAllTeachers,
  deleteOneTeacher,
  readAllTeachers,
  fetchOneTeacher,
  adminApprovedTeachers,
  approvedTeachers,
  adminApprovedSchools,
  approvedSchools,
  deleteAllSchools,
  deleteOneSchool,
  readAllSchool,
  fetchOneSchool
} = new AdminController();

//Parent Admin Route
router.route('/register/admin').post(registerAdmin);
router.route('/login/admin').post(adminLogin);
router.route('/logout/admin').get(authenticate, adminLogout);

router
  .route('/admin/parent')
  .get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), readAllParent)
  .delete(authenticate, permit(['godAdmin']), deleteAllParent);
router.route('/admin/parent/approved').get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), approvedParents);
router
  .route('/admin/parent/:_id')
  .get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneParent)
  .delete(authenticate, permit(['superAdmin', 'godAdmin']), deleteOneParent);
router.route('/admin/parent/:_id/approve').get(authenticate, permit(['superAdmin', 'godAdmin']), adminApprovedParents)

// Teacher Admin Route
router
  .route('/admin/teacher')
  .get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), readAllTeachers)
  .delete(authenticate, permit(['godAdmin']), deleteAllTeachers);
router.route('/admin/teacher/approved').get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), approvedTeachers);
router
  .route('/admin/teacher/:_id')
  .get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneTeacher)
  .delete(authenticate, permit(['godAdmin']), deleteOneTeacher);
router.route('/admin/teacher/:_id/approved').get(authenticate, permit(['superAdmin', 'godAdmin']), adminApprovedTeachers);

// School Admin Route
router
  .route('/admin/school')
  .get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), readAllSchool)
  .delete(authenticate, permit(['godAdmin']), deleteAllSchools);
router.route('/admin/school/approved')
  .get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), approvedSchools);
router
  .route('/admin/school/:_id')
  .get(authenticate, permit(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneSchool)
  .delete(authenticate, permit(['godAdmin']), deleteOneSchool);
router.route('/admin/school/:_id/approved').get(authenticate, permit(['admin']), adminApprovedSchools);

export default router;