import React from 'react';
import Offers from "../../components/Offers";
import Banner from '../Header/Banner';
import Products from '../products/Products';
import Services from '../Services/Services';
import Testimonials from '../Testimonial/Testimonials';

const HomeScreen = () => {
    return (
        <main className="w-full">
            {/* Banner Section */}
            <div className="py-5">
                <Banner />
            </div>

            {/* Services Section */}
            <div className="mt-5 py-5 bg-light">
                <Services />
            </div>

            {/* Products Section */}
            <div className="mt-5 py-5">
                <Products />
            </div>

            {/* Offers Section */}
            <div className="mt-5py-5 bg-gray-100">
                <Offers />
            </div>
           
            {/* Testimonials Section */}
            <div className="mt-5 py-5">
                <Testimonials />
            </div>
        </main>
    );
};

export default HomeScreen;
