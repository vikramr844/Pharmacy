import React, { useEffect, useState } from "react";
import "../../assets/styles/PrivacyPolicy.css";
import LoadingSpinner from "../../components/LoadingSpinner";

import { Bounce } from 'react-awesome-reveal';
const PrivacyPolicy = () => {
  const [policyContent, setPolicyContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the fake API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1") // Fake API endpoint
      .then((response) => response.json())
      .then((data) => {
        setPolicyContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch privacy policy.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div><LoadingSpinner/></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="privacy-policy ">
       <Bounce triggerOnce>
              <h1 className='policy-title ms-auto justift-conten-center' >Privacy  Policy</h1>
            </Bounce>
      <div className="policy-text">
        <p>{policyContent.body}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
