const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  price: {
    type: Number,
    required:[true, 'Total price is required!']
  },
  qty: {
    type: Number,
    required:[true, 'Quantity is required!']
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

const Order = mongoose.model('orderdetail', OrderDetailSchema);

module.exports = Order;