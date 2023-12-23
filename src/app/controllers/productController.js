const ProductModel = require('../models/product')

class ProductController {
    //[GET] /products
    async getProducts(req, res, next) {
        try {
            // lấy ra tất cả sản phẩm và nhóm theo thể loại
            const products = await ProductModel.aggregate([
                { $group : { _id : "$genre", products : { $push : "$$ROOT" } } },
                { $project : { _id : 0, title : "$_id", data : "$products" } }
            ]) 
            res.status(200).json({ "message" : "fetch product data successfully", products })
        }
        catch(err) {
            res.status(500).json({ "message" : "fetch product data failed" })
            console.log('error message', err)
            next(err)
        }
    }

    // [POST] /products/addproduct
    async addProduct(req, res, next) {
        try {
            await ProductModel.create(req.body.product)
            res.status(200).json({ message : 'Add new product successfully' })
        }
        catch(err) {
            res.status(500).json({ "message" : 'Add new product failed' })
            console.log(err)
            next(err)
        }
    }

    //[PUT] /products/comment
    async addComment (req, res, next) {
        try {
            const { productId, comment } = req.body
            const product = await ProductModel.findOne({ _id : productId })
            if(product)
            {
                product.comments = [comment, ...product.comments]
                await product.save()
            }
            res.status(200).json({ message : "Add comment successfully" , comments : product.comments || [] })
        }
        catch(err) {
            res.status(500)
            console.log(err)
            next(err)
        }
    }
}

module.exports = new ProductController