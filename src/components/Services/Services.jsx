import { motion } from 'framer-motion';
import React, { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../assets/styles/ServicesStyles/Services.css";
import Heading from '../../components/Heading';
import LoadingSpinner from "../../components/LoadingSpinner";
import Service from './Service';

const Services = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const services = await response.json();
        setData(services.slice(0, 10).map((item) => ({
          id: item.id,
          title: item.title,
          icon: item.id % 2 === 0 ? '' : 'https://via.placeholder.com/150',
          description: item.body,
        })));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <section className="services-container">
        <Heading title="Services" />
        {loading && <div className="text-center"><LoadingSpinner /></div>}
        {error && <div className="text-center text-danger">Error: {error}</div>}
        {!loading && !error && (
          <Swiper
            className="py-4"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {data.map((service) => (
              <SwiperSlide key={service.id} className="d-flex justify-content-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="service-card"
                >
                  <Service {...service} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
};

export default Services;
