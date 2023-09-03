const express = require('express')
const authController = require('../controllers/auth')
const {ValidateUserRegister} = require('../middleware/validation/user_validator')
const {userVlidation} = require('../middleware/validation/user_validator')
const {ValidateUserLogin} = require('../middleware/validation/user_validator')
const { isAuthorized } = require('../middleware/auth')

const router = express.Router()

router.post('/register', ValidateUserRegister,userVlidation, authController.register_user)
router.get('/register', authController.getroles)

router.post('/login', ValidateUserLogin,userVlidation, authController.login)

router.get('/Roleredirector',isAuthorized,authController.redirectUserAccordingToRole)

router.post('/priv', isAuthorized)

module.exports = router