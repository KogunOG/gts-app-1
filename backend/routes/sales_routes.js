const express = require("express")
const sales_controller = require("../controllers/sales_controller")
const { isAuthorized } = require('../middleware/auth')


const router = express.Router()

router.get("/", isAuthorized, sales_controller.get_projects)
router.post("/create_card", isAuthorized, sales_controller.create_projects)
router.post("/delete_card", isAuthorized, sales_controller.delete_projects)

module.exports = router