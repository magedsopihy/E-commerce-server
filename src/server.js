const app = require('./express')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.options('*', cors())
// Connection URL
// mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.MONGODB_URI}`)
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', process.env.PORT)
})
