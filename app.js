const express = require('express')
const config = require('./app/configs/config')

const routerApiCategories = require('./app/api/v1/categories/router')
const routerApiImages = require('./app/api/v1/images/routes')
const routerApiTalents = require('./app/api/v1/talents/routes')
const routerApiEvents = require('./app/api/v1/events/routes')
const routerApiOrganizer = require('./app/api/v1/organizers/routes')
const routerApiAuth = require('./app/api/v1/auth/routes')
const routerApiOrder = require('./app/api/v1/orders/routes')
const routerApiParticipant = require('./app/api/v1/participants/routes')
const routerApiPayment = require('./app/api/v1/payments/routes')

require('./app/db/connection')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const notFoundMidlleware = require('./app/middleware/not-found')
const handleErrorMiddleware = require('./app/middleware/handle-error')

const app = express()
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(config.port, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

const v1 = '/api/v1'

app.use(`${v1}/cms`, routerApiCategories)
app.use(`${v1}/cms`, routerApiImages)
app.use(`${v1}/cms`, routerApiTalents)
app.use(`${v1}/cms`, routerApiEvents)
app.use(`${v1}/cms`, routerApiOrganizer)
app.use(`${v1}/cms`, routerApiAuth)
app.use(`${v1}/cms`, routerApiOrder)
app.use(`${v1}/cms`, routerApiPayment)
app.use(`${v1}`, routerApiParticipant)

app.use(notFoundMidlleware)
app.use(handleErrorMiddleware)
