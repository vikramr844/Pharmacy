import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BannerImg from "../../assets/banner/landingPage.png";
import "../../assets/styles/BannerStyles/Banner.css";
import Button from '../Form/Button';

const Banner = () => {
    const navigate = useNavigate(); // Updated: useNavigate replaces useHistory
    const currentYear = new Date().getFullYear(); // Dynamic year

    return (
        <section className="banner-container">
            <motion.div
                className="banner-content"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                {/* Text and Button Section with Animation */}
                <motion.div
                    className="banner-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <h1 className="poppins">
                        Best Quality <br /> <span>Medicine in {currentYear}</span>
                    </h1>
                    <p>
                        Discover premium medicines curated just for you.
                        <br /> Your health is our priority.
                    </p>
                    {/* Button */}
                    <Button
                        className="banner-button"
                        text="Explore our shop"
                        onClick={() => navigate('/products')}
                    />
                </motion.div>

                {/* Image Section with Animation */}
                <motion.div
                    className="banner-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <img src={BannerImg} alt="banner" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Banner;
