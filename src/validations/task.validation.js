const { body, param } = require('express-validator');

exports.createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Task description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
];

exports.updateTaskValidation = [
  param('id')  // Changed from 'taskId' to 'id'
    .notEmpty()
    .withMessage('Task ID is required'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value'),
];

exports.taskIdValidation = [
  param('id')  // Changed from 'taskId' to 'id'
    .notEmpty()
    .withMessage('Task ID is required'),
];