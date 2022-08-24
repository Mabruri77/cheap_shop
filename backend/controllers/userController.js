const { Error } = require('mongoose')
const User = require('../model/userModel')
const createToken = require('../utils/createToken')
const asyncHandler = require('express-async-handler')
exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: createToken(user._id)
		})
	} else {
		res.status(404).json({ message: 'invalid email or password' })
	}
})

exports.register = async (req, res) => {
	const { name, email, password } = req.body
	const userExist = await User.findOne({ email })
	if (userExist) {
		throw new Error('user already exist')
	} else {
		const user = await User.create({
			name,
			email,
			password
		})
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: createToken(user._id)
			})
		} else {
			throw new Error('failed to register, pease try again')
		}
	}
}

exports.updateProfile = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body
	const user = await User.findById(req.user._id)
	if (user) {
		user.name = name || user.name
		user.email = email || user.email
		if (password) {
			user.password = password || user.password
		}
		const updated = await user.save()
		if (updated) {
			res.json({
				_id: updated._id,
				name: updated.name,
				email: updated.email,
				isAdmin: updated.isAdmin
			})
		}
	} else {
		throw new Error('not authorized, pease try again')
	}
})
