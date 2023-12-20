const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/authController')

router.get('/verify/:token', authController.verifyUser)
router.get('/favourites/:token', authController.getFavouriteProducts)
router.get('/:token', authController.getSigleUserInfo)
router.get('/', authController.getUsers)
router.post('/register', authController.create)
router.post('/resetpassword/:id/:token', authController.verifyResetPassword)
router.post('/changepassword/:id/:token', authController.changePassword)
router.post('/resetpassword', authController.resetPassword)
router.post('/login', authController.login)
router.post('/delete-account', authController.destroy)
router.post('/adjust-password', authController.adjustPassword)
router.patch('/update-favourites', authController.updateUserFavouriteProducts)

module.exports = router