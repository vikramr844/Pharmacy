import React from 'react';
import "../assets/styles/LoadingSpinner.css";
const LoadingSpinner = () => {
  return (
    <div className="loading flex justify-center items-center h-full">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingSpinner;