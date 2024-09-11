const express = require('express');
const { uploadMedia } = require('../controllers/expoController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();
const multer = require('multer');

// File upload route for expo photos/videos
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, adminMiddleware, upload.single('media'), uploadMedia);

module.exports = router;