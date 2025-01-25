import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../assets/styles/HealthBlog/BlogRead.css";

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading blog post...</div>;
  }

  if (!blog) {
    return <h2 className="text-center mt-5">Blog Post Not Found</h2>;
  }

  return (
    <div className="blog-post-container">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-author-date">By Author - {new Date().toDateString()}</p>
      <div className="blog-content">{blog.body}</div>
    </div>
  );
};

export default BlogPost;
