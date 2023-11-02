const ProductModel = require('../models/product')

class ProductController {
    //[GET] /products
    async getProducts(req, res, next) {
        try {
            const products = await ProductModel.find({})
            res.status(200).json({ "message" : "fetch product data successfully", products })
        }
        catch(err) {
            res.status(500).json({ "message" : "fetch product data failed" })
            console.log('error message', err)
            next(err)
        }
    }
}

module.exports = new ProductController