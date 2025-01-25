import React from 'react';

const ContactForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700">Message</label>
        <textarea id="message" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
