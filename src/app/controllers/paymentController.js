const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../data')
const userModel = require('../models/user')
const orderModel = require('../models/order')
const cartModel = require('../models/cart')

class paymemtController {
    //[POST] /payments/order
    async createNewOrder (req, res, next) {
        try {
            const { token , products, shippingAddress, totalPrice, paymentMethod  } = req.body
            const { userId } = jwt.verify(token, SECRET_KEY)
            await orderModel.create({ userId, products, shippingAddress, totalPrice, paymentMethod })
            const cart =  await cartModel.findOne({ userId }) 
             await userModel.updateOne({ _id : userId }, { addresses : {...shippingAddress } })
            if(cart)
            {
                cart.products = []
                await cart.save()
            }
            res.status(200).json({ message : "place order successfully!" })
        }
        catch(error) {
            console.error(error)
            next(error)
        }
    }
}

module.exports = new paymemtController