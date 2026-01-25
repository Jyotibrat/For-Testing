const express = require('express');
const router = express.Router();
const {
    getStats,
    getUsers,
    toggleUserStatus,
    createAdmin
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// All routes require admin access
router.use(protect, adminOnly);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/toggle', toggleUserStatus);
router.post('/users/admin', createAdmin);

module.exports = router;
