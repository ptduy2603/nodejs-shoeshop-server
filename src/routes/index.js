const authRouter = require('./auth')

const route = (app) => {
    app.use('/users', authRouter)
}

module.exports = route