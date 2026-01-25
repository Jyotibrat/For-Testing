const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    getPapers,
    getPaper,
    createPaper,
    updatePaper,
    deletePaper,
    trackDownload,
    getPopularPapers,
    getRecentPapers
} = require('../controllers/paperController');
const { protect, adminOnly } = require('../middleware/auth');
const { cachePapersList, cachePopular } = require('../middleware/cache');
const { paperValidation, papersQueryValidation } = require('../middleware/validate');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

// Public routes
router.get('/', papersQueryValidation, cachePapersList, getPapers);
router.get('/popular', cachePopular, getPopularPapers);
router.get('/recent', getRecentPapers);
router.get('/:id', getPaper);
router.post('/:id/download', trackDownload);

// Admin routes
router.post('/', protect, adminOnly, upload.single('pdf'), createPaper);
router.put('/:id', protect, adminOnly, updatePaper);
router.delete('/:id', protect, adminOnly, deletePaper);

module.exports = router;
