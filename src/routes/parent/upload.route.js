import { Router } from 'express';
import { UploadImage } from '../../controllers/parent';
import { authenticate, permit } from '../../middleware';
//import { multerUploads } from '../middleware/multer';

//
const upload = require("../../middleware/multer")
const router = Router();
const { 
uploadPicture,
} = new UploadImage();

router
  .route('/parents/:_id/upload')
  .put(upload.imageUpload.any(), authenticate, permit(['admin', 'parent']), uploadPicture)

  export default router;