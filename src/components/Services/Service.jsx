import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultImg from '/brandName.png';

const Service = ({ id, cover, title, icon, description }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const encodedId = encodeURIComponent(id); // Ensuring safe URL encoding
    navigate(`/services/${encodedId}`);
  };

  return (
    <div
      className="card flex flex-col justify-between bg-white border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:scale-105 rounded-lg p-4 h-full max-w-xs mx-auto cursor-pointer"
      onClick={handleNavigation} // Add onClick for card navigation
    >
      <img
        className="w-24 h-24 mx-auto mb-4 object-cover"
        src={icon || DefaultImg || "https://via.placeholder.com/150"}
        alt={title || 'Service icon'}
      />
      <div className="card-body flex flex-col justify-between">
        <h5 className="text-xl font-semibold text-gray-700">{title}</h5>
        <p className="text-gray-500 text-sm mb-4 flex-grow">
          {description.length > 70 ? `${description.slice(0, 70)}...` : description}
        </p>
      </div>
    </div>
  );
};

Service.propTypes = {
  id: PropTypes.number.isRequired,
  cover: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default Service;
