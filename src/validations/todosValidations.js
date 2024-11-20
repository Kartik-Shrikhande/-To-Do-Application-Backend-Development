const { body } = require('express-validator')

exports.createTodoValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority value'),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status value'),
  body('dueDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid due date format'),
];

exports.updateTodoValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority value'),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status value'),
  body('dueDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid due date format'),
];
