import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';

const Testimonial = ({ username, image, review, rating }) => {
    return (
        <div className="container px-5 py-12 mx-auto">
            <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center bg-gray-50 p-4 shadow-lg rounded-lg">
                <img
                    className="w-12 mx-auto mb-4"
                    src="../../../assets/right-quote-sign.png"
                    alt="Quote"
                />
                <p className="leading-relaxed poppins text-gray-500">{review}</p>
                <span className="inline-block h-1 w-10 rounded bg-blue-600 mt-8 mb-6"></span>

                {/* Rating */}
                <div className="flex items-center justify-center pb-4">
                    <Rating
                        emptySymbol={<AiOutlineStar className="text-gray-600 text-xl" />}
                        fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
                        initialRating={rating}
                        readonly
                    />
                    <span className="text-gray-600">({rating})</span>
                </div>

               
            </div>
        </div>
    );
};

export default Testimonial;
