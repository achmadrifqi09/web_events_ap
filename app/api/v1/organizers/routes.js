const express = require('express')
const router = express.Router()
const { createCMSOrganizer, createCMSUser, getAllCMSUser } = require('./controller')
const { authenticateUser, authorizationRoles } = require('../../../middleware/auth')

router.post('/organizers', createCMSOrganizer)
router.post('/user', authenticateUser, authorizationRoles('organizer'), createCMSUser)
router.get('/user', authenticateUser, authorizationRoles('organizer'), getAllCMSUser)

module.exports = router
