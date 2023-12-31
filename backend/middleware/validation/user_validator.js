const {check, validationResult} = require('express-validator')


exports.ValidateUserRegister = [
    check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
    
    check('password').isLength({min: 8, max: 20}).
    withMessage("Password must be 8-20 characters!"),

    // check('confirmPass').trim().notEmpty().custom((value, {req}) => {
    //     if(value !== req.body.password){
    //         throw new Error('Both passwords must be the same')
    //     }
    // })
]

exports.userVlidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
  
    const error = result[0].msg;
    res.json({ success: false, message: error });
  };
  
  exports.ValidateUserLogin = [
    check('email').trim().isEmail().withMessage('Invalid email!'),
    
    check('password').trim().notEmpty().withMessage("Password cannot be empty!")

    // check('confirmPass').trim().notEmpty().custom((value, {req}) => {
    //     if(value !== req.body.password){
    //         throw new Error('Both passwords must be the same')
    //     }
    // })
]