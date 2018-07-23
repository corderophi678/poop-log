require('dotenv').config()
const path = require('path')
const server = require('http').createServer()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { router: users } = require('./routes/users')
const { router: pups } = require('./routes/pups')
const { router: poops } = require('./routes/poop')

const PORT = process.env.PORT || 5000

const app = express()
mongoose.Promise = global.Promise
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(e => console.warn(e))

require('./middleware').setupMiddleware(app)

app.use(cors())
app.use('/api/users', users)
app.use('/api/pups', pups)
app.use('/api/poops', poops)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

server.on('request', app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
