const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true,
    },
    products : [
        {
            productId : {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'products'
            },
            quantity : { type: Number , required: true },
            color: { type: String, required: true },
            size: { type: Number, required: true },
        }
    ],
    totalPrice: {
        type: Number,
        required : true,
    },
    shippingAddress: {
        phoneNumber: {
            type: String,
            required: true,
        },
        ward: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        }
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status : {
        type: String,
        default : 'pendding',
    },
}, { timestamps: true })

module.exports = mongoose.model('orders', orderSchema)
