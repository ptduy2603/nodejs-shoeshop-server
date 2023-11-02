const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/authController')

router.get('/verify/:token', authController.verifyUser)
router.get('/', authController.getUsers)
router.post('/register', authController.create)
router.post('/resetpassword/:id/:token', authController.verifyResetPassword)
router.post('/changepassword/:id/:token', authController.changePassword)
router.post('/resetpassword', authController.resetPassword)
router.post('/login', authController.login)

module.exports = router