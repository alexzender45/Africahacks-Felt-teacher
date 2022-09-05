import { Router } from 'express';
import { UploadVideoAndImage } from '../../controllers/teacher';
import { authenticate, permit } from '../../middleware';
//import { multerUploads } from '../middleware/multer';

//
const upload = require("../../middleware/multer")
const router = Router();
const { 
changePicture,
  changeVideo,
  UploadResume
} = new UploadVideoAndImage();

router
  .route('/teachers/:_id/upload')
  .put(upload.imageUpload.any(), authenticate, permit(['admin', 'user']), changePicture)

  router
  .route('/teachers/:_id/video')
  .put(upload.videoUpload.any(), authenticate, permit(['admin', 'user']), changeVideo)

  router
  .route('/teachers/:_id/resume')
  .put(upload.imageUpload.any(), authenticate, permit(['admin', 'user']), UploadResume)
  export default router;