const express = require('express');
const adminController = require('../controllers/admin.controller');
const { protect } = require('../middlewares/auth.middleware');
const { adminOnly } = require('../middlewares/role.middleware');

const router = express.Router();

// Debug: Check if controller is loaded
console.log('Admin Controller:', adminController);
console.log('getAllTasks:', adminController.getAllTasks);

// All routes are protected and admin only
router.get('/tasks', protect, adminOnly, adminController.getAllTasks);

module.exports = router;