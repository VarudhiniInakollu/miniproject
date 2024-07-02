// middleware/upload.js

const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // File name
  },
});

// File upload middleware
const upload = multer({
  storage,
}).single('file'); // 'file' is the key from FormData
module.exports = upload;
