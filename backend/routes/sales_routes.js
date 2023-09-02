const express = require("express")
const sales_controller = require("../controllers/sales_controller")
const { isAuthorized } = require('../middleware/auth')


const router = express.Router()

router.get("/", isAuthorized, )

module.exports = router