import express from 'express';
import multer from 'multer';
import path from 'path';
import { createCSV } from '../controllers/csvControllerUpload.js';

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const filetypes = /csv/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('CSV files only!')
  }
}

const upload = multer({ storage, fileFilter: function (req, file, cb) {
  checkFileType(file, cb)
}})

router.post('/', upload.single('file'), createCSV);

export default router