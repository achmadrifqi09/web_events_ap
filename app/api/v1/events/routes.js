const express = require('express')
const router = express.Router()
const { index, create, find, update, destroy, status } = require('./controller')

router.get('/events', index)

router.get('/events/:id', find)

router.post('/events', create)

router.put('/events/:id', update)

router.delete('/events/:id', destroy)

router.put('/events/:id/status', status)

module.exports = router
