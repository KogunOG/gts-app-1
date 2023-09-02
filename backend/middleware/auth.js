const jwt = require("jsonwebtoken")
const db = require("../utils/db")

exports.isAuthorized  = async (req, res, next) =>{
    try {
        if(req.headers && req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.SECRET);
            const uid = decode.userID
            console.log(decode)

            db.query(
                "SELECT * FROM users WHERE id = ?",
                [decode.userID],
                async (error, results) => {
                    if (error) {
                      console.log(error);
                    }
                    if (results) {
                        req.uid = uid
                        next()
                    }
                  }
            )  
        }
        
        else{
            return res.json({
                success: false, message : "Unauthorized access!(No web token found)"
            })
        }
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
           
            const error = new Error("bad WebToken");
          res.status(404);
          next(error);
          }
          const error = new Error("something went wrong");
          res.status(404);
          next(error);
    }
    

}