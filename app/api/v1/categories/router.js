const express = require('express')
const router = express.Router()
const { index, create, find, update, destroy } = require('./controller')
const { authorizationRoles, authenticateUser } = require('../../../middleware/auth')

router.get('/categories', authenticateUser, authorizationRoles('organizer'), index)

router.post('/categories', authenticateUser, authorizationRoles('organizer'), create)

router.get('/categories/:id', authenticateUser, authorizationRoles('organizer'), find)

router.put('/categories/:id', authenticateUser, authorizationRoles('organizer'), update)

router.delete('/categories/:id', authenticateUser, authorizationRoles('organizer'), destroy)

module.exports = router
