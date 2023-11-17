const express = require('express')
const router = express.Router()
const paymentController = require('../app/controllers/paymemtController')
const orderModel = require('../app/models/order')

router.post('/intents', paymentController.recieveRequest)

module.exports = router

