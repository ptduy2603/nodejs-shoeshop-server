const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        required: true,
    },
    status : {
        type: String,
        default : 'active',
    },
    products: [
        {
            productId : {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'products'
            },
            quantity: {
                type: Number,
                required: true,
                default : 1,
            },
            size : {
                type: Number
            },
            color : {
               _id: false,
               name : String,
               image: String,
            }
        }
    ]
}, {
    timestamps: true,
})

module.exports = model('carts', CartSchema)