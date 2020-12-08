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
   approvedTeachersInEnglish,
   approvedTeachersInMathematics,
   approvedTeachersInBiology,
   approvedTeachersInCommerce,
   approvedTeachersInGovernment,
   approvedTeachersInEnglishLiterature,
   approvedTeachersInChristianReligiousStudies,
   approvedTeachersInHistory,
   approvedTeachersInCivicEducation,
   approvedTeachersInIslamicReligiousStudies,
   approvedTeachersInPhysics,
   approvedTeachersInGeography,
   approvedTeachersInChemistry,
   approvedTeachersInAccount,
   approvedTeachersInEconomics,
 } = new TeacherController();

router.route('/login').post(login);
router.route('/logout').get(authenticate, logOut);
router
  .route('/teachers')
  .get(authenticate, permit(['admin']), readAll)
  .post(upload.single('image'), register)
  .delete(authenticate, permit(['admin']), deleteAll);

  router.route('/teachers/Mathematics')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInMathematics)

  router.route('/teachers/English')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInEnglish)

  router.route('/teachers/Biology')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInBiology)

  router.route('/teachers/Commerce')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInCommerce)

  router.route('/teachers/Government')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInGovernment)

  router.route('/teachers/EnglishLiterature')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInEnglishLiterature)

  router.route('/teachers/History')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInHistory)

  router.route('/teachers/CivicEducation')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInCivicEducation)

  router.route('/teachers/IslamicReligiousStudies')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInIslamicReligiousStudies)

  router.route('/teachers/ChristianReligiousStudies')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInChristianReligiousStudies)

  router.route('/teachers/Physics')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInPhysics)

  router.route('/teachers/Geography')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInGeography)

  router.route('/teachers/Chemistry')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInChemistry)

  router.route('/teachers/Account')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInAccount)

  router.route('/teachers/Economics')
  .get(authenticate, permit(['admin', 'user']), approvedTeachersInEconomics)

router
  .route('/teachers/me')
  .get(authenticate, permit(['admin', 'user']), readOne)
  .delete(authenticate, permit(['admin', 'user']), deleteOne)
  .put(upload.single('image'), authenticate, permit(['admin', 'user']), update)

export default router;
 router.route('/teachers/me/approved').put(authenticate, permit(['admin']), adminApprovedTeachers)