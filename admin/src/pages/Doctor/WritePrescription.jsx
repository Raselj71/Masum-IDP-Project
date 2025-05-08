import React, { useState } from 'react';
import axios from 'axios';

const WritePrescription = () => {
  const [patientId, setPatientId] = useState('');
  const [medicines, setMedicines] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!patientId || !medicines || !instructions) {
      setError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('doctorToken');
      await axios.post(
        '/api/prescriptions',
        {
          patientId,
          medicines: medicines.split('\n').filter((m) => m.trim() !== ''),
          instructions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatientId('');
      setMedicines('');
      setInstructions('');
    } catch (err) {
      setError('Error creating prescription');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Write Prescription</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientId">Patient ID:</label>
          <input
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="medicines">Medicines:</label>
          <textarea
            id="medicines"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            rows={5}
            cols={33}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={5}
            cols={33}
          />
        </div>
        <button type="submit">Create Prescription</button>
      </form>
    </div>
  );
};

export default WritePrescription;