import { Router } from 'express';
import { authenticate, permit } from '../../middleware';
import { JobController } from '../../controllers/jobSchool';
//

const router = Router();
const { 
createJob,
readAllJob,
deleteAllJob,
fetchOneJob,
updateJob,
deleteOneJob 
   
 } = new JobController();


router
  .route('/job')
  .get(authenticate, permit(['admin','user','school']), readAllJob)
  .post(authenticate, permit(['admin','school']), createJob)
  .delete(authenticate, permit(['admin']), deleteAllJob);

router
  .route('/job/:_id')
  .get(authenticate, permit(['admin', 'user', 'school']), fetchOneJob)
  .delete(authenticate, permit(['admin', 'school']), deleteOneJob)
  .put(authenticate, permit(['admin', 'school']), updateJob)


 export default router;