const express = require("express")
const sales_controller = require("../controllers/sales_controller")
const { isAuthorized } = require('../middleware/auth')


const router = express.Router()

router.get("/sales_projects", sales_controller.get_projects)
router.post("/_create_sales_projects", isAuthorized, sales_controller.create_projects)
router.post("/delete_sales_projects", isAuthorized, sales_controller.delete_projects)
router.get("/update_sales_projects", isAuthorized, sales_controller.update_projects)

module.exports = router