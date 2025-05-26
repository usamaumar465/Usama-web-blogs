import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Bloglist.css";

const BlogList = () => {
  const { topicName } = useParams(); // Get topicName from the URL
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/topics/${topicName}/blogs`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [topicName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="blog-list-container">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content.substring(0, 100)}...</p>
          <Link to={`/topics/${topicName}/${blog.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
