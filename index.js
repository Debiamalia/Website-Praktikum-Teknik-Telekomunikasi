require('dotenv').config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const serverRouter = require('./routes/server')
const pttRouter = require('./routes/ptts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
const uri = "mongodb+srv://Asisten:radartelmat123@pttcluster.8hu0g.mongodb.net/pttdatabase?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser:true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', serverRouter)
app.use('/ptts', pttRouter)

app.listen(8080, () => {
    console.log(`Server is running on port ${8080}`)
})