import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRider = () => {
  const [rideID, setRideID] = useState('');
  const [riderName, setRiderName] = useState('');
  const [riderMobileNumber, setRiderMobileNumber] = useState('');
  const [riderAddress, setRiderAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!rideID || !riderName || !riderMobileNumber || !riderAddress) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken'); 
      const response = await axios.post(
        '/api/rider',
        { rideID, riderName, riderMobileNumber, riderAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate('/admin/riders')
      } else {
        setError('Failed to add rider.');
      }
    } catch (err) {
      setError('An error occurred while adding the rider.');
      if (err.response) {
        setError(err.response.data.message)
      }
    }
  };

  return (
    <div>
      <h2>Add Rider</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rideID">Ride ID:</label>
          <input
            type="text"
            id="rideID"
            value={rideID}
            onChange={(e) => setRideID(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="riderName">Rider Name:</label>
          <input
            type="text"
            id="riderName"
            value={riderName}
            onChange={(e) => setRiderName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="riderMobileNumber">Rider Mobile Number:</label>
          <input
            type="text"
            id="riderMobileNumber"
            value={riderMobileNumber}
            onChange={(e) => setRiderMobileNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="riderAddress">Rider Address:</label>
          <input
            type="text"
            id="riderAddress"
            value={riderAddress}
            onChange={(e) => setRiderAddress(e.target.value)}
          />
        </div>
        <button type="submit">Add Rider</button>
      </form>
    </div>
  );
};

export default AddRider;