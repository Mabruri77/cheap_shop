const express = require('express')
const { getAllProduct, getProduct } = require('../controllers/productController')
const route = express.Router()

route.get('/', getAllProduct)
route.get('/:id', getProduct)
module.exports = route
