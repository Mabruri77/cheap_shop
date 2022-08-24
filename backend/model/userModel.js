const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
)

userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next()
	}
	this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)
module.exports = User
