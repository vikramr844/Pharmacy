import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-awesome-reveal';
import '../assets/styles/Offers.css';
import LoadingSpinner from "./LoadingSpinner";

const Offers = () => {
  const [offerMedicines, setOfferMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOfferMedicines = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); // Fetch medicines from API
        const data = await response.json();
        const filteredOffers = data.filter(item => item.offer && item.offer.toLowerCase() !== 'no offer'); // Ensure offer exists
        setOfferMedicines(filteredOffers);
      } catch (error) {
        console.error("Failed to fetch medicines", error);
      } finally {
        setLoading(false);
      }
    };

    getOfferMedicines();
  }, []);

  const chunkedMedicines = [];
  const itemsPerChunk = 3; // Adjust as needed
  for (let i = 0; i < offerMedicines.length; i += itemsPerChunk) {
    chunkedMedicines.push(offerMedicines.slice(i, i + itemsPerChunk));
  }

  if (loading) {
    return <div className="text-center py-4"><LoadingSpinner/></div>;
  }

  return (
    <>
      <div className="container  carousel-container my-5">
        <Bounce triggerOnce>
          <h1 className="text-gray-700 items-center ms-auto justify-content-center poppins text-3xl">Special <span className="text-blue-600 font-semibold select-none">Offers</span></h1>
        </Bounce>
        
        {chunkedMedicines.length > 0 ? (
          <div id="offersCarousel" className="carousel slide" data-bs-ride="carousel">
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {chunkedMedicines.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#offersCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner">
              {chunkedMedicines.map((chunk, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="row">
                    {chunk.map((medicine) => (
                      <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={medicine.id}>
                        <div className="card offer-card shadow-lg">
                          <img
                            src={medicine.image || "/images/default-medicine.jpg"}
                            alt={medicine.title}
                            className="card-img-top rounded-top"
                            onError={(e) => (e.target.src = '/images/default-medicine.jpg')} // Default image on error
                          />
                          <div className="card-body text-center">
                            <h5 className="card-title fw-bold text-dark">{medicine.title}</h5>
                            <p className="card-text text-muted">
                              {medicine.description || 'No description available.'}
                            </p>
                            <p className="card-text">
                              <span className="fw-bold">Price:</span> ₹{medicine.price || 'N/A'}
                            </p>
                            {medicine.offer ? (
                              <p className="card-text text-success fw-bold">
                                Offer: {medicine.offer}
                              </p>
                            ) : (
                              <p className="card-text text-muted">No special offer available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#offersCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#offersCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <div className="no-offers text-center py-5">
            <h3 className="fw-bold text-danger">Oops! No Special Offers Right Now</h3>
            <p className="text-muted mb-4">We're sorry, but there are currently no special offers available. Please check back later!</p>
            <img
              src="/images/no-offers.svg"
              alt="No offers"
              className="img-fluid"
              style={{ maxWidth: '300px' }}
            />
            <p className="text-muted mt-3">In the meantime, explore our wide range of medicines and products!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Offers;
