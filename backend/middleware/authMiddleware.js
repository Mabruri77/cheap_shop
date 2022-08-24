const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

exports.protect = asyncHandler(async (req, res, next) => {
	var token
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1]
			var decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decoded.id).select('-password')
			next()
		} catch (error) {
			res.status(201)
			throw new Error('not authorized!')
		}
	}
	if (!token) {
		throw new Error('not authorized!')
	}
})
