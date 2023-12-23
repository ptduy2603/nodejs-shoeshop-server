const express = require('express')
const router = express.Router()
const paymentController = require('../app/controllers/paymentController')

router.get('/:token', paymentController.getUserOrders)
router.post('/order', paymentController.createNewOrder)

module.exports = router

