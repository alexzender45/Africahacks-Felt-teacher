import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|pdf|docs)$/)) {
      return cb(new Error('Please select the correct format!'), false);
    }
    cb(null, true);
  }
});

export default upload;
