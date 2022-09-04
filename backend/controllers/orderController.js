const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')
exports.createOder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		taxPrice,
		shippingPrice,
		itemsPrice,
		totalPrice
	} = req.body
	try {
		var order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			taxPrice,
			shippingPrice,
			itemsPrice,
			totalPrice
		})
		const result = await order.save()
		res.status(201).json(result)
	} catch (error) {
		res.status(500)
		console.log(error)
	}
})

exports.getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email')
	if (order) {
		res.json(order)
	} else {
		throw new Error('order not found')
		return
	}
})
exports.updateOrder = asyncHandler(async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
		if (order) {
			order.isPaid = true
			order.paidAt = Date.now()
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address
			}
			const updatedOrder = await order.save()
			res.json(updatedOrder)
		} else {
			throw new Error('order not found')
			return
		}
	} catch (error) {
		console.log(error)
	}
})
exports.getMyOrder = asyncHandler(async (req, res) => {
	try {
		const order = await Order.find({ user: req.user._id })
		if (order) {
			res.json(order)
		} else {
			throw new Error('no Order')
			return
		}
	} catch (error) {
		console.log(error)
	}
})
