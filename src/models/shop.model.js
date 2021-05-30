const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'shop name is required',
  },
  description: {
    type: String,
    trim: true,
    required: 'description is required',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  image: {
    name: String,
    url: String,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Shop', ShopSchema)
