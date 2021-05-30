const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  images: [
    {
      name: String,
      url: String,
    },
  ],
  description: {
    type: String,
    trim: true,
    required: 'Description is required',
  },
  category: {
    type: String,
    required: 'Category is required',
  },
  company: {
    type: String,
    required: 'company is required',
  },
  quantity: {
    type: Number,
    required: 'Quantity is required',
  },
  colors: [
    {
      name: String,
      color: String,
    },
  ],
  price: {
    type: Number,
    required: 'Price is required',
  },
  shipping: {
    type: Boolean,
    default: false,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' },
})

module.exports = mongoose.model('Product', ProductSchema)
