// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // You can define your spinner styles here

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
