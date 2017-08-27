const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  orderDetails: [{
    type: Schema.Types.ObjectId,
    ref: 'orderdetail'
  }],
  totalPrice: {
    type: Number,
    required:[true, 'Total price is required!']
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

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;