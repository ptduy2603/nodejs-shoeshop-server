const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const connectDatabase = require('./src/config/database')

const app = express()

// apply middleware to read body data-request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan for reading request log from clients
app.use(morgan('combined'))
app.use(cors())

// connect to MongoDB allats
connectDatabase(app)

app.get('/', (req,res) => {
    res.json({
        "Message" : "Welcome to my server application"
    })
})

