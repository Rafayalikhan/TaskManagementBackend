const express = require('express');
const taskController = require('../controllers/task.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validator.middleware');
const { createTaskValidation, updateTaskValidation } = require('../validations/task.validation');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', createTaskValidation, validate, taskController.createTask);
router.get('/', taskController.getUserTasks);
router.put('/:id', updateTaskValidation, validate, taskController.updateTask); // Changed :taskId to :id

module.exports = router;