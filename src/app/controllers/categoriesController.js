const CategoriesModel = require('../models/categories')

class CaterogiesController {
    //[GET] /categories
    async getCategories(req, res, next) {
        try {
            let categories = []
            categories = await CategoriesModel.find({})
            return res.status(200).json({ categories })
        }
        catch(err) {
            console.error(err)
            next(err)
        } 
    }
}


module.exports = new CaterogiesController