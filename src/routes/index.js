const authRouter = require('./auth')
const productRouter = require('./product')
const paymentRouter = require('./payment')
const countryRouter = require('./country')

const route = (app) => {
    app.use('/users', authRouter)
    app.use('/products', productRouter)
    app.use('/country', countryRouter)
    app.use('/payments', paymentRouter)
}

module.exports = route

