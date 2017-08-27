const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String, 
    required:[true, 'Category Name is required!'],
    trim: true
  },
  discription: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  subCategory: [{
    type: Schema.Types.ObjectId,
    ref: 'subcategory'
  }],
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;