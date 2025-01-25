import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom'; // For navigation to the product detail page
import swal from 'sweetalert';

const Product = ({ title, thumbnail, description, price, rating, id, stock }) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleAddToCart = () => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = storedItems.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedItems.push({ id, title, thumbnail, price, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(storedItems));
    swal('Success!', 'Your order has been added to the cart.', 'success').then(() => {
      setDisabled(true);
    });
  };

  const handleViewProduct = () => {
    // Navigate to a product detail page, passing the product ID as part of the route
    navigate(`/products/${id}`);
  };

  return (
    <div className="card shadow-sm rounded-xl border border-gray-200 hover:shadow-lg transition transform hover:scale-105">
      <div className="w-full h-50 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
        <img
          className="max-w-full max-h-full"
          src={thumbnail || 'https://via.placeholder.com/300'}
          alt={title || 'Product'}
        />
      </div>
      <div className="card-body text-center p-4">
        <h5 className="card-title text-gray-900 text-lg font-bold">
          {title || 'Unknown Product'}
        </h5>
        <p className="card-text text-gray-500">
          {description && description.length > 70
            ? `${description.slice(0, 70)}...`
            : description || 'No description available'}
        </p>
        <h6 className="text-gray-600 font-semibold text-xl">${price?.toFixed(2) || '0.00'}</h6>
        <div className="d-flex justify-center my-2">
          <Rating
            emptySymbol={<AiOutlineStar className="text-gray-600 text-xl" />}
            fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
            initialRating={rating || 0}
            readonly
          />
        </div>
        <div className="d-flex justify-center gap-3">
          <button
            disabled={disabled || stock === 0}
            onClick={handleAddToCart}
            className={`btn ${disabled ? 'btn-success' : 'btn-primary'}`}
          >
            {disabled ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={handleViewProduct} // View product details
            className="btn btn-secondary"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
