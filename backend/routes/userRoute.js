const express = require('express')
const { login, getProfile, register } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(register)
router.post('/login', login)
router.route('/profile').get(protect, getProfile)

module.exports = router