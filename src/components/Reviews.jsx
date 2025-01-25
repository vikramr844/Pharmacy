import React from 'react';
import '../assets/styles/Review.css';
import reviewData from '../data/ReviewData';

const Reviews = () => {
  return (
    <div className="carousel-container py-5">
      <h2 className="reviews-heading text-center mb-4 text-primary">Customer Reviews</h2>
      <div
        id="reviewsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000" // Auto-slide every 3 seconds
        data-bs-pause="hover" // Pause the carousel on hover
      >
        <div className="carousel-inner">
          {reviewData.length > 0 ? (
            reviewData.map((review, index) => (
              <div
                key={review.id}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <div className="review-card shadow-lg rounded">
                  <div className="review-card-body">
                    <h5 className="review-card-title">{review.name}</h5>
                    <p className="review-card-text">{review.review}</p>
                    <p className="review-rating text-muted">Rating: {review.rating} / 5</p>
                    <p className="review-date text-muted">Date: {review.date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reviews">
              <img src="no-reviews-image.jpg" alt="No reviews available" className="img-fluid mb-3" />
              <h3>No Reviews Yet</h3>
              <p>Be the first to leave a review!</p>
            </div>
          )}
        </div>
        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#reviewsCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#reviewsCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Reviews;
