const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

// apply middleware to read body data-request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.json({
        "Message" : "Welcome to my server"
    })
})

app.listen(PORT, () => {
    console.log(`App is runing on port ${PORT}`)
})