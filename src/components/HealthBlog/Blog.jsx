import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setBlogs(response.data.slice(0, 9));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading blogs...</div>;
  }

  return (
    <div className="container mt-5">
      <motion.div
        className="text-center mb-5"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-gray-700 font-bold text-3xl">
          Health <span className="text-blue-600 font-semibold select-none">Blog</span>
        </h1>
        <div className="bg-blue-600 mx-auto w-16 h-1 mt-2 rounded-full"></div>
      </motion.div>
      <div className="row">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: index * 0.2, // Staggered animation for each blog card
            }}
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.body.substring(0, 100)}...</p>
                <Link to={`/health-blog/${blog.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
