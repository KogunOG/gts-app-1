const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler")


const {check} = require('express-validator')


exports.register_user = asynchandler(async (req, res) => {
  console.log(req.body);

  const { email, role, password } = await req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.json({
          message: "That email is already in use",
        });
      }
      

      const hashpass = await bcrypt.hash(password, 8);

      db.query(
        "INSERT INTO users SET ?",
        { email: email, role: role, password: hashpass },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            return res.json({ success: "registered" });
          }
        }
      );
    }
  );
});

exports.getroles = (req, res) => {

  db.query(
    "SELECT * from role_db",
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results) {
        res.json({
          results
        })
      }
    }
    
  )

};

exports.login = asynchandler( async(req, res) => {

  const {email, password} = await req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      else{
        bcrypt.compare(password, results[0].password, (err, resp) => {
          if (err){
            console.log(err)
            res.end()
          }
          if (resp) {
            const token = jwt.sign({userID: results[0].id}, process.env.SECRET)
            return res.json({
              roleid: results[0].role,
              userid: results[0].id,
              token
            })
          } 
          else{
            return res.json({
              message : "pass no match!! "
            })
          }
        });
      }
      
    }
    
    )
});