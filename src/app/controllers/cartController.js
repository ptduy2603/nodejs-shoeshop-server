const { SECRET_KEY } = require('../../data')
const jwt = require('jsonwebtoken')
const cartModel = require('../models/cart')

class CartController {
    //[GET] /cart/:token
    async getCart(req, res, next) {
        try {
            const token = req.params.token
            console.log(token)
            const { userId } = jwt.verify(token, SECRET_KEY)
            const cart = await cartModel.findOne({ userId }).populate('products.productId', 'name price code')
            res.status(200).json({ products : cart?.products || [] })        
        }
        catch(err) {
            res.status(500).json({"message": "Get cart failed"})
            console.log('Get user cart err', err)
            next(err)
        }
    }

    //[POST] /cart/add-product
    async addProductToCart (req, res, next) {
        try {
            const { token, product } = req.body
            const { userId } = jwt.verify(token, SECRET_KEY)
            const cart = await cartModel.findOne({ userId })
            if(cart) {
                // kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
                let existProduct = null
                existProduct = cart.products.find(item => {
                    return (item.productId.equals(product._id) && item.size === product.size && item.color.name === product.color.name)
                })
                if(!existProduct) {
                    cart.products.push({
                        productId : product._id,
                        quantity : 1,
                        size : product.size,
                        color : product.color
                    })
                    await cart.save()
                    return res.status(200).json({ "message" : "Add product to cart successfully" })       
                }
                else {
                    return res.status(400).json({"message" : "product has been already in cart"})   
                }                             
            }
            else {
                const products = [
                    {
                        productId : product._id,
                        size: product.size,
                        color : product.color,
                        quantity : 1
                    }
                ]
                await cartModel.create({ userId, products})
                return res.status(200).json({ "message" : "create new cart" })
            }
        }
        catch(err) {
            res.status(500).json({"message" : "add product to cart failed"})
            console.log(err)
            next(err)
        }
    }
}

module.exports = new CartController