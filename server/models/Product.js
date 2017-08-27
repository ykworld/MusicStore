const mongoose = require('mongoose');
const ProductImageSchema = require('./ProductImage');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String, 
    required:[true, 'Product Name is required!'],
    trim: true
  },
  description: {
    type: String, 
    required:[true, 'Product Description is required!']  
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  price: {
    type: Number,
    required:[true, 'Price is required!']
  },
  stock: {
    type: Date,
    required:[true, 'Stock is required!']
  },
  sku: {
    type: String
  },
  images: [ProductImageSchema],
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;