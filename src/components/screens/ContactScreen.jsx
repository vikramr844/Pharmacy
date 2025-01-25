import { motion } from 'framer-motion'; // Import Framer Motion for animations
import React, { useState } from 'react';
import ContactForm from '../../components/Contact/ContactForm';

const ContactScreen = () => {
  const [formStatus, setFormStatus] = useState(null); // To handle the form submission status

  // Animation Variants for fade-in effect
  const fadeInVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Simulate form submission process
    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  return (
    <section className="max-w-screen-xl py-24 mx-auto px-6 overflow-y-hidden">
      {/* Heading */}
      <motion.div
        className="flex flex-col items-center space-x-2 pb-4"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-gray-700 poppins text-3xl text-center md:text-4xl">
          Contact <span className="text-blue-600 font-semibold select-none">Us</span>
        </h1>
        <div className="bg-blue-600 flex items-center justify-center w-16 h-1 mt-2 rounded-full"></div>
      </motion.div>

      {/* Success Message */}
      {formStatus === 'success' && (
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-green-100 text-green-700 text-center p-4 rounded-lg mb-6"
        >
          <p>Your message has been successfully submitted! We'll get back to you soon.</p>
        </motion.div>
      )}

      {/* Contact Form */}
      <ContactForm onSubmit={handleFormSubmit} />
    </section>
  );
};

export default ContactScreen;
