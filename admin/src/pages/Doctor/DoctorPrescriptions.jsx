import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDoctor } from '../../context/DoctorContext';

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { doctor } = useDoctor();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        setError(null);
        if (doctor && doctor._id) {
          const response = await axios.get(
            `/api/prescriptions/doctor/${doctor._id}`
          );
          setPrescriptions(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch prescriptions');
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [doctor]);

  if (loading) return <div>Loading prescriptions...</div>;
  if (error) return <div>Error: {error}</div>;

  if (prescriptions.length === 0) {
    return <div>No prescriptions written yet.</div>;
  }

  return (
    <div>
      <h2>Your Prescriptions</h2>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <div>Prescription ID: {prescription._id}</div>
            <div>Patient ID: {prescription.patientId}</div>
            <div>Date: {new Date(prescription.date).toLocaleDateString()}</div>
            <div>Medicines: {prescription.medicines.join(', ')}</div>
            <div>Instructions: {prescription.instructions}</div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPrescriptions;