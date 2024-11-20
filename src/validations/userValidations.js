const { body } = require('express-validator')

const userSignupValidation = [
  body('username').trim().notEmpty().withMessage('username is required'),
  body('email').isEmail().withMessage('A valid email is required'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

const userLoginValidation = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const updateUserProfileValidation = [
  body('username').optional().trim().notEmpty().withMessage('Invalid username'),

];

module.exports = {
  userSignupValidation,
  userLoginValidation,
  updateUserProfileValidation,
}
