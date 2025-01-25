import { motion } from 'framer-motion';
import React, { useState } from 'react';
import '../../assets/styles/LoadingSpinner.css';
import '../../assets/styles/ProductStyles/ProductScreen.css';
import useFetch from '../APIs/useFetch';
import Heading from '../Heading';
import LoadingSpinner from '../LoadingSpinner';
import Product from '../products/Product';
import SearchBar from "../SearchBar/SearchBar";

const ProductsScreen = () => {
  const [data, loading, error] = useFetch('products');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products per page

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error fetching products: {error.message}</div>;

  const totalPages = Math.ceil(data.length / productsPerPage);

  // Get current products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const productVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="max-w-screen-xl py-24 mx-auto px-6">
      <Heading title="Products" />
      <SearchBar />
      
      {/* Displaying Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-6">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={productVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, ease: 'easeOut', delay: product.id * 0.1 }}
          >
            <Product {...product} />
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination flex justify-center items-center space-x-3 mt-6">
        <button
          className="btn-pagination"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn-pagination ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn-pagination"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsScreen;
