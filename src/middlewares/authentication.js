const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (!token) return res.status(400).json({ message: 'Token is not present' })
    // Remove 'Bearer' word from the token
    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) return res.status(401).json({ message: 'Invalid or expired token' })

      const user = await userModel.findById(decodedToken.Id);
      if (!user) return res.status(404).json({ message: 'User not found' })

      if (user.token !== token) {
        return res.status(401).json({ message: 'Invalid session, please log in again' })
      }
      // Set userId in the request object
      req.userId = decodedToken.Id
      next()
    })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


module.exports = { authentication }
