const config = require('./../config/config')
const app = require('./express')
const mongoose = require('mongoose')

// Connection URL
// mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
app.get('/', (req, res) => res.send('E-commerce api'))

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', process.env.PORT)
})
