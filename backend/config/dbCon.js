const mongoose = require('mongoose')
var connectDB = async () => {
	try {
		var con = await mongoose.connect(`${process.env.MONGO_URI}`, {})
		console.log(`connected: ${con.connection.host}`)
	} catch (error) {
		console.error(`Error: ${error}`)
	}
}

module.exports = connectDB
