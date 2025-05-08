import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RiderList = () => {
  const [riders, setRiders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/riders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRiders(response.data);
      } catch (err) {
        setError('Error fetching riders');
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchRiders();
  }, [navigate]);

  if (error) {
    return <div className='text-center text-red-500 mt-4'>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rider List</h2>
      {riders.length === 0 ? (
        <p>No riders found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {riders.map((rider) => (
            <li key={rider._id} className="py-4">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-bold">Ride ID:</span> {rider.rideID}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Rider Name:</span> {rider.riderName}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Mobile:</span> {rider.riderMobileNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Address:</span> {rider.riderAddress}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RiderList;