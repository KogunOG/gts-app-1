const db = require('../utils/db')


exports.get_projects = (req,res) =>{

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
        }
      )

}

exports.create_projects = async (req, res ) =>{
    const { Client, Exp_Delivery_Sales, Description_Sales } = await req.body;

  db.query(   
    "INSERT INTO sales SET ?",
    { 
        sales_person_id: req.uid,
        Client: Client, 
        Exp_Delivery_Sales: Exp_Delivery_Sales, 
        Description_Sales: Description_Sales 
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.json({ success: "created a project" });
        p_id = results
      }
    }
    
  );
}

exports.delete_projects =  async (req, res) =>{
  const { p_id } = await req.body;
  db.query(
    "Delete FROM sales WHERE  p_id = ?",
    [p_id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        return res.json({ success: "project successfully deleted(from sales table)" });
      }
    }
  )
}

exports.update_projects = () =>{

}