const Prescription = require('../models/prescriptionModel');

const createPrescription = async (req, res) => {

  try {
    const { patientId, doctorId, date, medicines, instructions } = req.body;
    const prescription = new Prescription({
      patientId,
      doctorId,
      date,
      medicines,
      instructions,
    });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrescriptionById = async (req, res) => {

  try {
    const prescriptionId = req.params.prescriptionId;
    const prescription = await Prescription.findById(prescriptionId).populate('patientId doctorId');
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
};

const getPrescriptionsByPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const prescriptions = await Prescription.find({ patientId }).populate('patientId doctorId');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrescriptionsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const prescriptions = await Prescription.find({ doctorId }).populate('patientId doctorId');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = { createPrescription, getPrescriptionById, getPrescriptionsByPatient, getPrescriptionsByDoctor };

module.exports = { createPrescription, getPrescriptionById };
