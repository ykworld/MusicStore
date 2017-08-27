const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: {
    type: String, 
    required:[true, 'Street is required!'],
    trim: true
  },
  postal_code: {
    type: String,
    required:[true, 'Postal code is required!'],
    trim: true
  },
  city: {
    type: String,
    required:[true, 'City is required!'],
    trim: true
  },
  state: {
    type: String,
    required:[true, 'State is required!'],
    trim: true
  },
  country: {
    type: String,
    required:[true, 'Country is required!'],
    trim: true
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

const Address = mongoose.model('address', AddressSchema);

module.exports = Address;