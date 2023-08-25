const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({ path: './.env'})


const connection = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    user:process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS
})

connection.connect(function(error) {
    if(error){
        throw error;
    }else{
        console.log('Connected to MySQL Database!!')
    }
} )


module.exports = connection;