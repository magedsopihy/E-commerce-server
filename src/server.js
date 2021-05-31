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
  throw new Error(`unable to connect to database: ${process.env.MONGODB_URI}`)
})
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  ) // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type') // If needed
  res.setHeader('Access-Control-Allow-Credentials', true) // If needed

  res.send('cors problem fixed:)')
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', process.env.PORT)
})
