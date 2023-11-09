const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/productController')

router.get('/', productController.getProducts)
router.post('/addproduct', productController.addProduct)

module.exports = router