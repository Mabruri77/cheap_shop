const express = require('express')
const {
	createOder,
	getOrderById,
	updateOrder,
	getMyOrder
} = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(protect, createOder)
router.route('/myorder').get(protect, getMyOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrder)

module.exports = router
