const express = require('express')
const router = express.Router()
const { createCMSOrganizer, createCMSUser } = require('./controller')
const { authenticateUser } = require('../../../middleware/auth')

router.post('/organizers', authenticateUser, createCMSOrganizer)
router.post('/user', authenticateUser, createCMSUser)

module.exports = router
