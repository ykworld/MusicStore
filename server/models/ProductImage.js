const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = new Schema({
  image: {
    type: String,
    trim: true
  }
});

module.exports = ProductImageSchema;