const db = require('../utils/db')

exports.new_get_proj = (req,res) => {
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
          // res.json({ message: "No projects here!"})
        }
      )
}
exports.ong_get_proj = (req,res) => {
    db.query(
      `SELECT new_project.np_id,sales.Client
         FROM new_project
        INNER JOIN sales ON new_project.sales_client_id = sales.p_id
        WHERE new_project.mtn = 0`,
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
            res.json({ message: "No projects here in exec!"})
          }
          
        }
      )
}
exports.exec_get_proj = (req,res) => {
 
  db.query(
    `SELECT  o.on_p_id, s.Client
      FROM (ongoing_projects o JOIN new_project n ON o.np_id = n.np_id AND o.mtn=0)
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
        else{
          res.json({ message: "No projects here!"})
        }
        
      }
    )
}

exports.new_post_proj = async (req,res) => {
    const { sales_client_id, files_rec_date, resp_person_id, expt_deli } = await req.body;
    
  db.query(   
    "INSERT INTO new_project SET ?",
    { 
        sales_client_id: sales_client_id,
        files_rec_date: files_rec_date, 
        resp_person_id: resp_person_id, 
        expt_deli: expt_deli 
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //removing from get req of new_projects
        db.query(   
          "UPDATE sales SET mtn = '1' WHERE p_id = ?",
          [sales_client_id],
          (error, results) => {
            if (error) {
              console.log(error);
            } 
            return res.json({ success: "Moved to ongoing and removed from new projects" });
            
          }
          
        );
      }
    }
    
  );
}

exports.ong_post_proj = async (req,res) => {

  const { np_id, internal, external, material_sourcing, cutting, bending, welding, finishing, led_wiring, comments, QC_by  } = await req.body;
    
  db.query(   
    "INSERT INTO ongoing_projects SET ?",
    { 
      np_id: np_id,
      internal: internal,
      external: external,
      material_sourcing: material_sourcing,
      cutting: cutting,
      bending: bending,
      welding: welding,
      finishing: finishing,
      led_wiring: led_wiring,
      comments: comments,
      QC_by: QC_by
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
          //removing from get req of ong_projects
          db.query(   
            "UPDATE new_project SET mtn = '1' WHERE np_id = ?",
            [np_id],
            (error, results) => {
              if (error) {
                console.log(error);
              } 
              return res.json({ success: "Moved to exec and removed from ongoing projects" });
              
            }
            
          );
        }
      }
    
    
  );

}

exports.exec_post_proj = async (req,res) => {
 
  const { ongoing_id, measurement_sheet } = await req.body;
    
  db.query(   
    "INSERT INTO execution SET ?",
    { 
      ongoing_id,
      measurement_sheet
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //removing from get req of exec_projects
        db.query(   
          "UPDATE ongoing_projects SET mtn = '1' WHERE on_p_id = ?",
          [ongoing_id],
          (error, results) => {
            if (error) {
              console.log(error);
            } 
            return res.json({ success: "Moved to accounts and removed from execution" });
            
          }
          
        );
      }
    }
    
  );

}

exports.new_delete_projects =  async (req, res) =>{
  const { p_id } = await req.body;
  db.query(
    "Delete FROM new_project WHERE  np_id = ?",
    [p_id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        return res.json({ success: "project successfully deleted(from new table)" });
      }
    }
  )
}

exports.ong_delete_projects =  async (req, res) =>{
  const { p_id } = await req.body;
  db.query(
    "Delete FROM ongoing_projects WHERE  on_p_id = ?",
    [p_id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        return res.json({ success: "project successfully deleted(from ongoing table)" });
      }
    }
  )
}

exports.exec_delete_projects =  async (req, res) =>{
  const { p_id } = await req.body;
  db.query(
    "Delete FROM execution WHERE  ex_id = ?",
    [p_id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        return res.json({ success: "project successfully deleted(from execution table)" });
      }
    }
  )
}