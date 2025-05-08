const express = require('express');
const router = express.Router();
const { createRider, getAllRiders } = require('../controllers/riderController');
const { authAdmin } = require('../middleware/authAdmin');


router.post('/', authAdmin, createRider);
router.get('/', getAllRiders);

module.exports = router;
