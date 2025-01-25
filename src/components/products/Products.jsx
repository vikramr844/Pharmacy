import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-awesome-reveal';
import Heading from '../../components/Heading';
import LoadingSpinner from "../../components/LoadingSpinner";
import Product from './Product';

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center"><LoadingSpinner/></div>;
  if (error) return <div className="text-center text-danger">Error fetching products: {error.message}</div>;

  return (
    <section className="container-xl px-4 py-6">
      <Heading title="Medicines" />  
  
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 py-6">
        {data?.products?.slice(0, 6).map((product) => (
          <div className="col" key={product.id}>
            <Bounce left>
              <Product {...product} />
            </Bounce>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
