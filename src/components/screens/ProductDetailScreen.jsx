import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsArrowLeft, BsCart2 } from 'react-icons/bs';
import Rating from 'react-rating';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import LoadingSpinner from "../../components/LoadingSpinner";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const result = await response.json();
        setProduct(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div><LoadingSpinner/></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="max-w-screen-xl py-24 mx-auto px-6 overflow-y-hidden">
      <div className="flex flex-col justify-center items-center pt-24">
        <div className="p-6 box-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <Fade triggerOnce direction="left">
              <img
                className="w-full h-full mx-auto object-cover rounded-lg"
                src={product?.thumbnail || 'https://via.placeholder.com/300'}
                alt="Product Thumbnail"
              />
            </Fade>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center h-full">
            <Fade triggerOnce direction="left">
              <div className="border-b border-gray-400 pb-4">
                <h1 className="poppins text-gray-800 text-3xl">{product.title}</h1>
                <div className="flex items-center space-x-3 mt-4">
                  <Rating
                    emptySymbol={<AiOutlineStar className="text-gray-600 text-xl" />}
                    fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
                    initialRating={product.rating}
                    readonly
                  />
                  <span className="text-gray-600">
                    {product.rating} ({product.ratingCount} Reviews)
                  </span>
                </div>
                <p className="text-sm pt-2 text-gray-600">{product.description}</p>
              </div>
              <h1 className="pt-5 text-xl text-gray-800">
                <span className="font-semibold text-lg">Price:</span> ${product.price}
              </h1>
              <div className="flex mt-6">
                <button
                  className="btn-primary py-2 px-4"
                  onClick={() => swal('Added', 'Product added to cart', 'success')}
                >
                  <BsCart2 />
                  Add To Cart
                </button>
              </div>
              {/* Go Back Button */}
              <button
                onClick={() => navigate('/products')} // Navigates to "/products"
                className="text-gray-600 mt-4 hover:bg-gray-100 py-2 px-4 rounded-md text-sm flex items-center space-x-2"
              >
                <BsArrowLeft />
                <span>Go Back</span>
              </button>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailScreen;
