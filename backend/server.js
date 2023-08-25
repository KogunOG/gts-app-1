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
app.use(express.static(publicDir))
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.set('view engine', 'hbs')


app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5000)

