import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Topics.css";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/topics");
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="topics-container">
      {topics.map((topic) => (
        <div className="topic-card" key={topic.id}>
          <h2>{topic.name}</h2>
          <Link to={`/topics/${topic.name.toLowerCase()}`}>View Blogs</Link>
        </div>
      ))}
    </div>
  );
};

export default Topics;
