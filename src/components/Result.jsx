import React from "react";
import { Link, useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { query, category, results } = location.state || {};

  return (
    <section id="results">
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Search Results for: {query}</h2>
        <div className="row">
          {results && results.length > 0 ? (
            results.map((medicine) => (
              <div className="col-md-4 mb-3" key={medicine.id}>
                <Link
                  to={`/medicine/${medicine.id}`}
                  state={{ medicine }}
                  className="text-decoration-none"
                >
                  <div className="card h-100">
                    <img
                      src={medicine.image || "default-image-url"}
                      alt={medicine.name}
                      className="card-img-top"
                      style={{ maxHeight: "220px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{medicine.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {medicine.category}
                      </h6>
                      <p className="card-text">
                        <strong>Price:</strong> ₹{medicine.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-warning">No results found.</p>
          )}
        </div>
        <div className="text-center mt-3">
          <Link
            to="/"
            state={{ query, category }}
            className="btn btn-warning"
          >
            Back to Search
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Result;
