const express = require('express')
const router = express.Router()
const { index, create, find, update, destroy, status } = require('./controller')
const { authenticateUser, authorizationRoles } = require('../../../middleware/auth')
router.get('/events', authenticateUser, authorizationRoles('organizer'), index)

router.get('/events/:id', authenticateUser, authorizationRoles('organizer'), find)

router.post('/events', authenticateUser, authorizationRoles('organizer'), create)

router.put('/events/:id', authenticateUser, authorizationRoles('organizer'), update)

router.delete('/events/:id', authenticateUser, authorizationRoles('organizer'), destroy)

router.put('/events/:id/status', authenticateUser, authorizationRoles('organizer'), status)

module.exports = router
