const express = require('express')
const router = express.Router()
const { index, find, create, update, destroy } = require('./controller')

router.get('/talents', index)

router.post('/talents', create)

router.get('/talents/:id', find)

router.put('/talents/:id', update)

router.delete('/talents/:id', destroy)

module.exports = router
