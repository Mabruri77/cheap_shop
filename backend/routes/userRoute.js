const express = require('express')
const { login, register, updateProfile } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(register)
router.post('/login', login)
router.route('/profile').put(protect, updateProfile)

module.exports = router
