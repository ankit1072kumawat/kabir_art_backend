import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    index: true
  },
  description: {
    type: String,
    trim: true,
    index: true,
    required: true
  },
  sku: {
    type: String,
    trim: true,
    index: true,
    required: true
  },
  quantity: {
    type: Number,
  },
  category: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },
  featured: {
    type: Number,
    required: false
  },
  status: {
    type: Number,
    required: true
  },
  group: {
    type: String,
    required: false
  },
  created_ts: {
    type: Date,
    default: Date.now,
    index: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    index: true
  },
  product_images: {
    type: Array,
    trim: true,
    required: false
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  meta: {
    type: String,
    trim: false,
    required: false

  },
  keyword: {
    type: Array,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: false
  },

  price: {
    type: String,
    trim: true,
    required: true
  },
  discounted_price: {
    type: String,
    trim: true,
    required: true
  },
  product_type: {
    type: String,
    trim: true,
    required: true
  },
})
export default mongoose.model('product', ProductSchema);
