import { Router } from 'express';
import { UploadImage } from '../../controllers/school';
import { authenticate, permit } from '../../middleware';
//import { multerUploads } from '../middleware/multer';

//
const upload = require("../../middleware/multer")
const router = Router();
const { 
uploadPicture,
} = new UploadImage();

router
  .route('/schools/:_id/upload')
  .put(upload.imageUpload.any(), authenticate, permit(['admin', 'school']), uploadPicture)

  export default router;