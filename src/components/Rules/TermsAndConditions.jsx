import React, { useEffect, useState } from 'react';
import '../../assets/styles/TermsAndConditions.css';
import LoadingSpinner from "../LoadingSpinner";

import { Bounce } from 'react-awesome-reveal';

const TermsAndConditions = () => {
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from a fake API (jsonplaceholder or other fake API)
    fetch('https://jsonplaceholder.typicode.com/posts/1')  // Replace with actual fake API endpoint
      .then((response) => response.json())
      .then((data) => {
        setTermsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching terms data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div><LoadingSpinner/></div>;
  }

  return (
    <div className="terms-and-conditions">
      <Bounce triggerOnce>
        <h1 className='terms-title ms-auto justift-conten-center' >Terms & Conditions</h1>
      </Bounce>
      <div className="terms-text">
        <p>{termsData?.title}</p>
        <p>{termsData?.body}</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
