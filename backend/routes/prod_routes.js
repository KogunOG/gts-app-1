const express = require("express")
const prod_controller = require("../controllers/prod_controller")
const { isAuthorized } = require('../middleware/auth')


const router = express.Router()

router.get("/new", isAuthorized, prod_controller.new_get_proj)
router.get("/ongoing", isAuthorized, prod_controller.ong_get_proj)
router.get("/exec", isAuthorized, prod_controller.exec_get_proj)

router.post("/new_sub", isAuthorized, prod_controller.new_post_proj)
router.post("/ong_sub", isAuthorized, prod_controller.ong_post_proj)
router.post("/exec_sub", isAuthorized, prod_controller.exec_post_proj)

router.post("/new_del", isAuthorized, prod_controller.new_delete_projects)
router.post("/ong_del", isAuthorized, prod_controller.ong_delete_projects)
router.post("/exec_del", isAuthorized, prod_controller.exec_delete_projects)

module.exports = router