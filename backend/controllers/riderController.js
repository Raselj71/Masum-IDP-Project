const Rider = require('../models/riderModel');

const createRider = async (req, res) => {
    // Only admin can perform this action
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admin can create a rider.' });
    }
    try {
        const { rideID, riderName, riderMobileNumber, riderAddress } = req.body;
        const rider = new Rider({
            rideID,
            riderName,
            riderMobileNumber,
            riderAddress,
        });
        await rider.save();
        res.status(201).json(rider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllRiders = async (req, res) => {
    try {
        const riders = await Rider.find();
        res.status(200).json(riders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const getRiderById = async (req, res) => {
//     try {
//         const rider = await Rider.findById(req.params.id);
//         if (!rider) {
//             return res.status(404).json({ message: 'Rider not found' });
//         }
//         res.status(200).json(rider);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = { createRider, getAllRiders };

module.exports = { createRider ,getRiderById};
