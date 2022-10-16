const express = require('express')
const config = require('./app/configs/config')
const routerApiCategories = require('./app/api/v1/categories/router')
require('./app/db/connection')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const notFoundMidlleware = require('./app/middleware/not-found')
const handleErrorMiddleware = require('./app/middleware/handle-error')

const app = express()
app.use(morgan('tiny'))
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

const v1 = '/api/v1/cms'
app.use(v1, routerApiCategories)

app.listen(config.port, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

app.use(notFoundMidlleware)
app.use(handleErrorMiddleware)
