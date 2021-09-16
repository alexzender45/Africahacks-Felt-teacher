import { Router } from 'express';
import { authenticate, permit } from '../../middleware';
import { JobParentController } from '../../controllers/jobParent';
//

const router = Router();
const { 
createJob,
readAllJob,
deleteAllJob,
fetchOneJob,
updateJob,
deleteOneJob 
   
 } = new JobParentController();


router
  .route('/jobparent')
  .get(authenticate, permit(['admin','user','school','parent']), readAllJob)
  .post(authenticate, permit(['admin','parent']), createJob)
  .delete(authenticate, permit(['admin']), deleteAllJob);

router
  .route('/jobparent/:_id')
  .get(authenticate, permit(['admin', 'user', 'school', 'parent']), fetchOneJob)
  .delete(authenticate, permit(['admin', 'parent']), deleteOneJob)
  .put(authenticate, permit(['admin', 'parent']), updateJob)


 export default router;