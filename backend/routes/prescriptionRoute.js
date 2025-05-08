const express = require('express');
const router = express.Router();
const { createPrescription, getPrescriptionById, getPrescriptionsByPatient, getPrescriptionsByDoctor } = require('../controllers/prescriptionController');
const { authDoctor } = require('../middleware/authDoctor'); // Import the authDoctor middleware


// Doctor must be logged in to create a prescription
router.post('/', authDoctor, createPrescription);
//anyone can access
router.get('/:id', getPrescriptionById);
//patient can access
router.get('/patient/:patientId', getPrescriptionsByPatient);
//doctor can access
router.get('/doctor/:doctorId', getPrescriptionsByDoctor);

module.exports = router;
