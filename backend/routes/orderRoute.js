const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getOrdersByUserId, assignRiderToOrder } = require('../controllers/orderController');
const { authUser } = require('../middleware/authUser');
const { authAdmin } = require('../middleware/authAdmin');

// Create an order (user authenticated)
router.post('/', authUser, createOrder);

// Get order by ID (user authenticated)
router.get('/:orderId', authUser, getOrderById);

// Get orders by user ID (user authenticated)
router.get('/user/:userId', authUser, getOrdersByUserId);

// Assign a rider to an order (admin authenticated)
router.patch('/:orderId/assignRider', authAdmin, assignRiderToOrder);

module.exports = router;