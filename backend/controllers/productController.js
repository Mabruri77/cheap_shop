const Product = require('../model/productModel')
exports.getAllProduct = async (req, res) => {
	const allProduct = await Product.find({})
	res.json(allProduct)
}
exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		res.json(product)
	} catch (error) {
		res.status(404).json({ message: 'product not found!' })
	}
}
