const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/authController')

router.get('/verify/:token', authController.verifyUser)
router.get('/', authController.getUsers)
router.post('/register', authController.create)
router.post('/login', authController.login)

module.exports = router