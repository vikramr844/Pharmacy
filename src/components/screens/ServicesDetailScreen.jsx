import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from "../../components/LoadingSpinner";
import DefaultImg from "/brandName.png"; // Make sure this is correct path

const ServicesDetailScreen = () => {
  const { id } = useParams(); // Get service ID from URL params
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) throw new Error('Service not found');
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]); // Re-fetch data whenever the ID changes

  if (loading) return <div className="text-center mt-24"><LoadingSpinner /></div>;
  if (error || !service) return <div className="text-center mt-24">Service not found.</div>;

  return (
    <section className="max-w-screen-xl mt-10 py-16 mx-auto px-6">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
          <Fade triggerOnce>
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img
                className="w-full h-96 object-cover"
                src={service.cover || DefaultImg || "https://via.placeholder.com/600"}
                alt="Service Cover"
              />
              <div className="p-6 bg-white">
                <div className="text-center">
                  <img
                    className="w-16 h-16 mx-auto mb-4"
                    src={service.icon || DefaultImg || "https://via.placeholder.com/150"}
                    alt="Service Icon"
                  />
                  <h1 className="text-3xl font-bold text-gray-800 mb-3">{service.title}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">{service.body}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-100 text-center">
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 transition duration-200 text-sm"
                >
                  <BsArrowLeft className="mr-2" />
                  Back to Services
                </button>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default ServicesDetailScreen;
