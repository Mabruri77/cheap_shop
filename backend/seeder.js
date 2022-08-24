const mongoose = require('mongoose')
const dotenv = require('dotenv')
const dbCon = require('./config/dbCon')
const products = require('./data/products')
const users = require('./data/users')
const User = require('./model/userModel')
const Product = require('./model/productModel')
const Order = require('./model/orderModel')

dotenv.config()
dbCon()

const importData = async () => {
	try {
		const createdUser = await User.insertMany(users)
		const adminUser = createdUser[0]._id
		const sampleProduct = products.map((product) => {
			return { ...product, user: adminUser }
		})
		await Product.insertMany(sampleProduct)
		console.log('success adding data')
		process.exit()
	} catch (error) {
		console.error(error)
	}
}

const deleteData = async () => {
	try {
		await User.deleteMany()
		await Product.deleteMany()
		await Order.deleteMany()
		console.log('success delete all Data Base')
		process.exit()
	} catch (error) {
		console.error(error)
	}
}

if (process.argv[2] === '-d') {
	deleteData()
} else {
	importData()
}
