const mongoose = require('mongoose');

const ALLOWED_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Kids']
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: String,
      url: String,
    }
  ],
  size: {
    type: [String],
    enum: ALLOWED_SIZES,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  ratings: [{
    star: Number,
    comment: String,
    postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }],
  totalrating: {
    type: String,
    default: 0,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);