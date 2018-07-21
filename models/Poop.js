const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PoopSchema = new Schema(
  {
    pup: {
      type: Schema.Types.ObjectId,
      ref: 'pups'
    },
    didPoop: {
      type: Boolean,
      default: false
    },
    time: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

const Poop = mongoose.model('poops', PoopSchema)

module.exports = { Poop }
