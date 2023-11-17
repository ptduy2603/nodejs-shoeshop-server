const jwt = require('jsonwebtoken')
const stripe = require('stripe')('sk_test_51ODA69Cbznb2GV06xMwa6L6AVkFOEHk583OqDTia7kRyGcBZoexZgRPhBG366PmgTkOPPSH1BoZKJTxdERRfSMcD00M3VkLZXs')

const { SECRET_KEY } = require('../../data')
const orderModel = require('../models/order')


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
}


module.exports = new paymemtController