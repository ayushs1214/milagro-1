const multer = require('multer');
const path = require('path');
const Media = require('../models/media');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload media controller
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const media = new Media({ filePath });

    await media.save();

    res.status(201).json({ message: 'File uploaded successfully', media });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Comment on the uploaded media
exports.addComment = async (req, res) => {
  const { mediaId, comment } = req.body;

  try {
    const media = await Media.findById(mediaId);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    media.comments.push({ user: req.user._id, comment });
    await media.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};