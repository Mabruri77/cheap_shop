const bcrypt = require('bcryptjs')
const users = [
	{
		name: 'Admin User',
		email: 'admin@mabruri.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'John Doe',
		email: 'john@mabruri.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},
	{
		name: 'Jane Doe',
		email: 'jane@mabruri.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},
	{
		name: 'hiro z',
		email: 'hiro@mabruri.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	}
]

module.exports = users
