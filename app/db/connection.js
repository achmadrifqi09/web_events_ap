const mongoose = require('mongoose')
const { urlDb } = require('../configs/config')

mongoose.connect(urlDb)
const db = mongoose.connection

db.on('error', (error) => {
    console.log('MongoDB connection error : ' + error)
})

db.on('open', () => {
    console.log('MongoDB connected')
})
