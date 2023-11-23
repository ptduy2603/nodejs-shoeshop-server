const express = require('express')
const cartController = require('../app/controllers/cartController')

const router = express.Router()

router.get('/:token', cartController.getCart)
router.post('/add-product', cartController.addProductToCart)

module.exports = router