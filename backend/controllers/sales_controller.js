const db = require('../utils/db')


exports.get_projects = (req,res) =>{

    db.query(
        "SELECT * from sales",
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

exports.create_projects = () =>{
    
}

exports.delete_projects = () =>{

}

exports.update_projects = () =>{

}