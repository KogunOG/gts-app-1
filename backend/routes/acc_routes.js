const express = require("express")
const acc_controller = require("../controllers/acc_controller")
const { isAuthorized } = require('../middleware/auth')


const router = express.Router()

router.get("/", isAuthorized, acc_controller.acc_get_projects)
router.post("/finish", isAuthorized, acc_controller.acc_post_projects)
// router.post("/delete_card", isAuthorized, acc_controller.delete_projects)

module.exports = router