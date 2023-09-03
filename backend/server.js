const express = require('express')
const colors = require('colors')
const morgan = require('morgan')

const dotenv = require('dotenv')
// const users = require('./routes/user.js')

const app = express()
const path = require('path')

var cors = require('cors');
app.use(cors());

dotenv.config({ path: './.env'})
const publicDir = path.join(__dirname, './public')

// Parse JSON bodies (as sent by API clients)
app.use(express.json())


// app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/user_routes'))
app.use('/sales', require('./routes/sales_routes'))
app.use('/prod', require('./routes/prod_routes'))
app.use('/acc', require('./routes/acc_routes'))


app.use(function (error, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
      message: error.message,
    })
  })

app.listen(5000)

