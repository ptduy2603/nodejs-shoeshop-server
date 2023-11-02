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
    modifiedOn : {
        type: Date,
        default : Date.now()
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
            }
        }
    ]
    /*
        products : Array { productId, quantity }
    */ 
}, {
    timestamps: true
})

module.exports = model('carts', CartSchema)