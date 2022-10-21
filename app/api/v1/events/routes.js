const express = require('express')
const router = express.Router()
const { index, create, find, update, destroy, status } = require('./controller')
const { authenticateUser, authorizationRoles } = require('../../../middleware/auth')
router.get('/events', index)

router.get('/events/:id', find)

router.post('/events', authenticateUser, authorizationRoles('organizer'), create)

router.put('/events/:id', authenticateUser, authorizationRoles('organizer'), update)

router.delete('/events/:id', authenticateUser, authorizationRoles('organizer'), destroy)

router.put('/events/:id/status', status)

module.exports = router
