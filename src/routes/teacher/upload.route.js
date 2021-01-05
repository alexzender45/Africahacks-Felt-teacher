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
} = new UploadVideoAndImage();

router
  .route('/teachers/:_id/upload')
  .put(upload.imageUpload.any(), authenticate, permit(['admin', 'user']), changePicture)

  router
  .route('/teachers/:_id/video')
  .put(upload.videoUpload.any(), authenticate, permit(['admin', 'user']), changeVideo)
  export default router;