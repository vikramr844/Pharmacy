import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-awesome-reveal';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);

  useEffect(() => {
    // Fetching data from JSONPlaceholder API (fake API)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => ({
          id: user.id,
          username: user.name,
          image: `https://i.pravatar.cc/150?img=${user.id}`, // Random avatar
          review: user.company.catchPhrase, // Placeholder for review text
          rating: (Math.random() * 5).toFixed(1), // Random rating
        }));
        setTestimonialData(formattedData);
      })
      .catch((error) => console.error('Error fetching testimonial data:', error));
  }, []);

  return (
    <section className="max-w-screen-xl mx-auto px-6 pb-24">
      {/* Heading */}
      <Bounce triggerOnce>
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        What Our Users Say
      </h1>
      </Bounce>
      {/* Testimonials Slider */}
      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={20}
        speed={600}
        modules={[Autoplay, Navigation, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
      >
        {testimonialData.map((item) => (
          <SwiperSlide key={item.id}>
            <Bounce triggerOnce>
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
              

                {/* Review Text */}
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{item.review}"
                </p>

                {/* Rating */}
                <Rating
                  emptySymbol={<AiOutlineStar className="text-gray-400 text-lg" />}
                  fullSymbol={<AiFillStar className="text-yellow-500 text-lg" />}
                  initialRating={item.rating}
                  readonly
                />
                <span className="text-gray-500 mt-2">({item.rating} / 5)</span>

                {/* User Info */}
                <div className="flex items-center mt-6">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                    src={item.image}
                    alt={item.username}
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.username}
                    </h2>
                  </div>
                </div>
              </div>
            </Bounce>
          </SwiperSlide>
        ))}
       
      </Swiper>
    </section>
  );
};

export default Testimonials;
