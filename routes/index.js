const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
   res.send('Welcome to API Events.ID')
})

module.exports = router
