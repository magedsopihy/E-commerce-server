const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const shopRoutes = require('./routes/shop.routes')
const productRoutes = require('./routes/product.routes')

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors({ origin: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', shopRoutes)
app.use('/', productRoutes)

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message })
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message })
    console.log(err)
  }
})

module.exports = app
