const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/authController')

router.get('/verify/:verificationToken', authController.verifyUser)
router.get('/', authController.getUsers)
router.post('/register', authController.create)

module.exports = router