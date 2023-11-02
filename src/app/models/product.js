const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
   name: {
        type: String,
        required : true,
   },
   code: {
        type: String,
        required : true,
        unique: true,
   },
   brand: {
        type: String,
        required: true,
   },
   genre: {
        type: String,
        required : true,
    },
    desciption : {
        type: String,
        required: true,
    },
    specials : [
        {
            colors: [
                {
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
            sizes: []       
        },
    ]   
}, { timestamps : true })


module.exports = mongoose.model('products', ProductSchema)
