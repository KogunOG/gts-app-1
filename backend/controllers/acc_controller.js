const db = require('../utils/db')


exports.acc_get_projects = (req,res) =>{

    db.query(
        "SELECT * from execution",
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

}

exports.acc_post_projects = async (req, res ) =>{
    const { exec_id, Payement_Recd_file, Payement_Recd_Date, Remark } = await req.body;

  db.query(   
    "INSERT INTO sales SET ?",
    { 
        exec_id,
        Payement_Recd_file,
        Payement_Recd_Date,
        Remark
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.json({ success: "Project is now 100% complete" });
        p_id = results
      }
    }
    
  );
}

// exports.delete_projects =  async (req, res) =>{
//   const { p_id } = await req.body;
//   db.query(
//     "Delete FROM sales WHERE  p_id = ?",
//     [p_id],
//     (error, results) => {
//       if (error) {
//         console.log(error);
//       } else {
//         return res.json({ success: "project successfully deleted(from sales table)" });
//       }
//     }
//   )
// }

// exports.update_projects = () =>{

// }