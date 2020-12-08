import { Router } from 'express';
import { TeacherController } from '../controllers';
import { upload, authenticate, permit } from '../middleware';
//

const router = Router();
const { 
  login, 
  logOut, 
  deleteAll, 
  deleteOne, 
  readAll, 
  readOne, 
  register,
   update, 
   adminApprovedTeachers,
   approvedTeachersInEnglishAndMathmaticsAndBiology,
   approvedTeachersInPhysisAndChemistryAndGeography,
   approvedTeachersInCommerceAndGovernmentAndAccount,
   approvedTeachersInEnglishLitratureAndCrkAndEconomics,
   approvedTeachersInIrkAndCivicEducationAndHistory
 } = new TeacherController();

router.route('/login').post(login);
router.route('/logout').get(authenticate, logOut);
router
  .route('/teachers')
  .get(authenticate, permit(['admin']), readAll)
  .post(upload.single('image'), register)
  .delete(authenticate, permit(['admin']), deleteAll);

  router.route('/teachers/EnglishAndMathamaticsAndBiology')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInEnglishAndMathmaticsAndBiology)

  router.route('/teachers/CommerceAndGovernmentAndAccount')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInCommerceAndGovernmentAndAccount)

  router.route('/teachers/PhysisAndChemistryAndGeography')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInPhysisAndChemistryAndGeography)

  router.route('/teachers/EnglishLitratureAndCrkAndEconomics')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInEnglishLitratureAndCrkAndEconomics)

  router.route('/teachers/IrkAndCivicEducationAndHistory')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInIrkAndCivicEducationAndHistory)

router
  .route('/teachers/me')
  .get(authenticate, permit(['admin', 'user']), readOne)
  .delete(authenticate, permit(['admin', 'user']), deleteOne)
  .put(upload.single('image'), authenticate, permit(['admin', 'user']), update)

export default router;
 router.route('/teachers/me/approved').put(authenticate, permit(['admin']), adminApprovedTeachers)