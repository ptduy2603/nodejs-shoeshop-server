const express = require('express')
const { country } = require('../data')
const router = express.Router()

router.get('/', (req, res) => {
    let { province, district, limit } = req.query
    var results = country

    if(!limit) limit = +Infinity

    if(province) {
        country.forEach(item => {
           if(item.code == province)
                results = item.districts
        })

        if(district) {
            results.forEach(item => {
                if(item.code == district)
                    results = item.wards
            })
        }

    }

    results = results.filter((item, index) => index+1 <= limit)       

    return res.status(200).json({ results })
})

module.exports = router