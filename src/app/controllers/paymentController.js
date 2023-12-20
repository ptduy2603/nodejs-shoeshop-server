const jwt = require('jsonwebtoken')

const { SECRET_KEY } = require('../../data')
const orderModel = require('../models/order')
const cartModel = require('../models/cart')

class paymemtController {
    //[POST] /payments/intents
    async recieveRequest(req, res, next) {
        try {
            const { token, products, totalPrice, addresses, paymentMethod } = req.body
            const { userId } = jwt.verify(token, SECRET_KEY)
            // create payment intents
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalPrice,
                currency : 'vnd',
                automatic_payment_methods : {
                    enable : true
                }
            })
            // return payment intents
            res.status(200).json({ paymentIntent : paymentIntent.client_secret })
        }
        catch(err) {
            console.log(err)
            next(err)
            res.status(500).json({ "message" : "payment intent error" })
        }
    }

    //[POST] /payments/order
    async createNewOrder (req, res, next) {
        try {
            const { token , products, shippingAddress, totalPrice, paymentMethod  } = req.body
            const { userId } = jwt.verify
            await orderModel.create({ userId, products, shippingAddress, totalPrice, paymentMethod })
            // const cart =        }
        }
        catch(error) {
            console.error(error)
            next(error)
        }
    }
}

module.exports = new paymemtController