const db = require('../utils/db')


exports.acc_get_projects = (req,res) =>{

    db.query(
      `SELECT  e.ex_id,e.completed, s.Client
      FROM execution e 
      JOIN ongoing_projects o ON e.ongoing_id = o.on_p_id
      JOIN new_project n ON o.np_id = n.np_id
      JOIN sales s ON n.sales_client_id = s.p_id`,
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
    const { exec_id, Payment_recd_file, payment_recd_date, remarks } = await req.body;

  db.query(   
    "INSERT INTO accounts SET ?",
    { 
        exec_id,
        Payment_recd_file,
        payment_recd_date,
        remarks
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        db.query(   
          "UPDATE execution SET completed = '1' WHERE ex_id = ?",
          [exec_id],
          (error, results) => {
            if (error) {
              console.log(error);
            } 
            return res.json({ success: "PROJECT IS 100% COMPLETE!!!" });
            
          }
          
        );
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