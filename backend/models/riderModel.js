const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  rideID: {
    type: String,
    required: true,
    unique: true,
  },
  riderName: {
    type: String,
    required: true,
  },
  riderMobileNumber: {
    type: String,
    required: true,
  },
  
  riderAddress: {
    type: String,
    required: true,
  },
});

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
