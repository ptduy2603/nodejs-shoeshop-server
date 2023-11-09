const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
   name: {
        type: String,
        required : true,
   },
   code: {
        type: String,
        required : true,
   },
   price: {
        type : Number,
        required: true,
   },
   brand: {
        type: String,
        required: true,
   },
   genre: {
        type: String,
        required : true,
    },
    desc : {
        type: String,
        required : true,
    },   
    colors: [
        {
            _id :false,
            color : {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            }
        }
    ],
    sizes: Array      
}, { timestamps : true })


module.exports = mongoose.model('products', productSchema)
