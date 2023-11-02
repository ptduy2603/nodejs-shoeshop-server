const authRouter = require('./auth')
const productRouter = require('./product')

const route = (app) => {
    app.use('/users', authRouter)
    app.use('/products', productRouter)
}

module.exports = route

