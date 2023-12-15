const express = require('express')
const CategoriesController = require('../app/controllers/categoriesController')
const router = express.Router()

router.get('/', CategoriesController.getCategories)

module.exports = router