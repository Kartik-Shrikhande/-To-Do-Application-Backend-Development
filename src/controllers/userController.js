const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const userModel = require('../models/userModel')


//-----------User Signup API ---------//

exports.signup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { username, email, password } = req.body
    const existEmail = await userModel.findOne({ email: email })
    if (existEmail) return res.status(400).json({ message: 'error', error: 'Email already exist' })
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Save the user using create method
    const newUser = await userModel.create({ username, email, password: hashedPassword })
    if (newUser) return res.status(201).json({ message: 'User registered successfully', user: newUser })
  }
  catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message })
  }
}


//-----------User Login API ---------//

exports.login = async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  try {
    const user = await userModel.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email' })

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ Id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
    await userModel.findByIdAndUpdate(user._id, { token })
    res.setHeader('token', token)
    return res.status(200).json({ token: token, message: 'User Login Successfully' })
  }
  catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message })
  }
};


//-----------User Profile view API -----//

exports.getProfile = async (req, res) => {

  try {
    const userId = req.userId
    const user = await userModel.findById(userId)
    if (!user) return res.status(404).json('User not found')
    if (user.isDeleted) { return res.status(400).json({ message: 'User is already deleted' }) }
    return res.json(user)
  }
  catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message })
  }
}


//-----------User Update Profile API -----//

exports.updateProfile = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const userId = req.userId
    let userProfile = await userModel.findById(userId);
    if (!userProfile) return res.status(404).json({ message: 'User Profile not found' })
    let { username } = req.body;
    const update = await userModel.findOneAndUpdate({ _id: userId }, { $set: { username } }, { new: true })
    return res.json({ message: 'Profile updated successfully', user: update })
  }
  catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message })
  }
}


//-----------User logout API -----//

exports.logout = async (req, res) => {
  try {
    const userId = req.userId
    // Find the user and clear the token
    const user = await userModel.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (!user.token) return res.status(400).json({ message: 'User is already logged out' })
    await userModel.findByIdAndUpdate(userId, { token: null })
    return res.status(200).json({ message: 'User logged out successfully' })
  }
  catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message })
  }
}



//-----------User delete Profile API -----//

exports.deleteProfile = async (req, res) => {
  try {
    const user = req.userId
    const findUser = await userModel.findById(user)
    if (!findUser) return res.status(404).json({ message: 'user not found' })
    if (findUser.isDeleted == true) return res.status(400).json({ message: "User is already Deleted" })
    const deleteUser = await userModel.findOneAndUpdate({ _id: user, isDeleted: false }, { $set: { isDeleted: true } })
    return res.status(200).json({ message: "User is deleted" })
  }
  catch (error) {
    return res.status(500).json({ message: 'Server Error', error: err.message })
  }
}
