const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  console.log(req.body);

  const { email, password, name } = req.body;

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
        { email: email, username: name, password: hashpass },
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
};
