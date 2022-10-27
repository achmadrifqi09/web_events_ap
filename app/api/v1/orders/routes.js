const express = require('express')
const router = express.Router()
const { index } = require('./controller')
const { authorizationRoles, authenticateUser } = require('../../../middleware/auth')

router.get('/orders', authenticateUser, authorizationRoles('organizer'), index)

module.exports = router
