const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription',
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider'
  },
  status: {
    type: String,
    default: 'pending'
  },
  deliveryAddress: {
    type: String
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
