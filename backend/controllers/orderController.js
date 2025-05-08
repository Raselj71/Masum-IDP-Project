const Order = require('../models/orderModel');
const Rider = require('../models/riderModel');

// Create an order
const createOrder = async (req, res) => {
    try {
        const { userId, prescriptionId, deliveryAddress } = req.body;
        const order = new Order({
            userId,
            prescriptionId,
            deliveryAddress,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an order by ID
const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId).populate('userId prescriptionId riderId');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get orders by user ID
const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate('userId prescriptionId riderId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Assign a rider to an order
const assignRiderToOrder = async (req, res) => {
    try {
        const { orderId, riderId } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { riderId, status: 'Assigned' }, { new: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

module.exports = { createOrder, getOrderById, getOrdersByUserId, assignRiderToOrder };
