const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PupSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  }
})

const Pup = mongoose.model('pups', PupSchema)

module.exports = { Pup }
