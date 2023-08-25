const express = require('express')

const router = express.Router()

router.get('/login', (req, res)=> {
    res.json({prompt:'hitting'})
})

module.exports = router