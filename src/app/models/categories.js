const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    id : {
        type : Number,
        required : true,
    },
    title : {
        type : String,
        required : true
    },
    type: String,
    image : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
    _id : false,
})

module.exports = mongoose.model('categories', categoriesSchema)