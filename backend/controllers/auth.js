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
    "SELECT email, password FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      // if (results.length == 0) {
      //   return res.json({
      //     message: "YOu entered incorrect email",
          
      //   })
      // }
      if (results) {
        return res.json(
          results
        )
      }
      // bcrypt.compare(password, results.password, (err, res) => {
      //   if (err){
      //     console.log(error)
      //   }
      //   if (res) {
      //     return res.json({
      //       message : "pass match!! "
      //     })
      //   } 
      // });
    }
    
    )
});