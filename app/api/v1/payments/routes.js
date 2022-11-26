const express = require('express')
const router = express.Router()
const { create, update, index, find, destroy } = require('./controller')
const { authorizationRoles, authenticateUser } = require('../../../middleware/auth')

router.get('/payments', authenticateUser, authorizationRoles('organizer'), index)

router.get('/payments/:id', authenticateUser, authorizationRoles('organizer'), find)

router.put('/payments/:id', authenticateUser, authorizationRoles('organizer'), update)

router.post('/payments', authenticateUser, authorizationRoles('organizer'), create)

router.delete('/payments/:id', authenticateUser, authorizationRoles('organizer'), destroy)

module.exports = router
