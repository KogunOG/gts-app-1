const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");

exports.register_user = asynchandler(async (req, res, next) => {
  const { email, password, name, selectedRole } = await req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?;",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        const error = new Error("This email is already in use");
        res.status(404);
        next(error);
      } else {
        const hashpass = await bcrypt.hash(password, 8);

        db.query(
          "INSERT INTO users SET ?",
          {
            email: email,
            role: selectedRole,
            password: hashpass,
            username: name,
          },
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              const token = jwt.sign(
                { userID: results.insertId, userRole: selectedRole },
                process.env.SECRET
              );
              return res.json({
                Verifytoken: token,
                displayName: name,
                roleName: selectedRole,
              });
            }
          }
        );
      }
    }
  );
});

exports.getroles = async (req, res) => {
  db.query("SELECT role_name from role_tb", async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results) {
      let roleNameArray = [];

      for (let index = 0; index < results.length; index++) {
        const element = results[index].role_name;

        roleNameArray.push(element);

        if (index + 1 === results.length) {
          res.json({
            roleNameArray,
          });
        }
      }
    }
  });
};

exports.login = asynchandler(async (req, res) => {
  const { email, password } = await req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        bcrypt.compare(password, results[0].password, (err, resp) => {
          if (err) {
            console.log(err);
            res.end();
          }
          if (resp) {
            const token = jwt.sign(
              { userID: results[0].id, userRole: results[0].role },
              process.env.SECRET
            );
            return res.json({
              Verifytoken: token,
              displayName: results[0].username,
              roleName: results[0].role,
            });
          } else {
            const error = new Error("Password do not match");
            res.status(404);
            next(error);
          }
        });
      }
    }
  );
});

exports.redirectUserAccordingToRole = asynchandler(async (req, res, next) => {
  try {
    const userID = req.userID;
    const roleName = req.roleofUser;

    if (roleName === "sales") {
      db.query("SELECT * FROM sales", async (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.json({ results });
        }
      });
    } else if (roleName == "production_head") {
      // db.query(
      //   `SELECT new_project.np_id,sales.Client
      //   FROM new_project
      //   INNER JOIN sales ON new_project.sales_client_id = sales.p_id`,
      //   async (error, results) => {
      //     if (error) {
      //       console.log(error)
      //       const err = new Error("Somethin went wrong!");
      //       res.status(404);
      //       next(err);
      //     } else {
      //       res.json({
      //         results,
      //       });
      //     }
      //   }
      // );
      db.query(
        "SELECT * from sales WHERE mtn = 0",
        async (error, results) => {
          if (error) {
            console.log(error);
          }
          if (results) {
            res.json({
              results
            })
          }
          else{
            res.json({ message: "No projects here!"})
          }
          
        }
      )
    } else if (roleName == "sales") {
      db.query("SELECT * from sales WHERE mtn = 0", async (error, results) => {
        if (error) {
          const err = new Error("Your role does'nt exist");
          res.status(404);
          next(err);
        } else {
          res.json({
            results,
          });
        }
      });
    } else {
      const error = new Error("No match");
      res.status(404);
      next(error);
    }
  } catch (err) {
    const error = new Error("Somethin went wrong!");
    res.status(404);
    next(error);
  }
});
