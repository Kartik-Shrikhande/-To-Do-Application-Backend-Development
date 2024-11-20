const express = require('express')
const router = express.Router()

const { signup, login, getProfile, deleteProfile, updateProfile, logout } = require('../controllers/userController')
const { userSignupValidation, userLoginValidation, updateUserProfileValidation } = require('../validations/userValidations')
const authMiddleware = require('../middlewares/authentication')

router.post('/signup', userSignupValidation, signup)
router.post('/login', userLoginValidation, login)
router.use(authMiddleware.authentication)
router.get('/profile', getProfile)
router.delete('/delete-profile', deleteProfile)
router.put('/update-profile', updateUserProfileValidation, updateProfile)
router.post('/logout', logout)

module.exports = router;
