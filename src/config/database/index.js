const mongoose = require('mongoose')

const connectionKey = 'mongodb+srv://admin:shoeshop@cluster0.3mxb0f7.mongodb.net/shoeshop?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000

const connectDatabase = async (app) => {
    try {
        await mongoose.connect(connectionKey,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log('Connect successfully to MongoDB')
        app.listen(PORT, () => {
            console.log(`App is runing on port ${PORT}`)
        })
    }
    catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}

module.exports = connectDatabase