const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  name: {
    type: String, 
    required:[true, 'Category Name is required!'],
    trim: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  discription: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

const SubCategory = mongoose.model('subcategory', SubCategorySchema);

module.exports = SubCategory;