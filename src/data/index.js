const fs = require('fs')
const file = __dirname + '/country.json'
var country = JSON.parse(fs.readFileSync(file, 'utf8'))

const SECRET_KEY = 'myserverforshoeshop'

module.exports = { country, SECRET_KEY }
