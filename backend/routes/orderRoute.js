const express = require('express')
const { createOder, getOrderById, updateOrder } = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(protect, createOder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrder)

module.exports = router
