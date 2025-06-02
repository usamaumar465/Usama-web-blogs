const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data for blogs
const blogs = [
  { id: 1, topicId: 1, title: "Introduction to DevOps", content: "DevOps is a culture..." },
  { id: 2, topicId: 1, title: "CI/CD Pipelines", content: "Continuous Integration and Deployment..." },
  { id: 3, topicId: 2, title: "React Basics", content: "React is a JavaScript library..." },
  { id: 4, topicId: 3, title: "Node.js Overview", content: "Node.js is a runtime environment..." },
];

const topics = [
  { id: 1, name: "devops" },
  { id: 2, name: "frontend" },
  { id: 3, name: "backend" },
];

// In-memory user store (for demo only)
const users = {};

// Routes
app.get("/api/topics", (req, res) => {
  res.json(topics);
});

app.get("/api/topics/:topicName/blogs", (req, res) => {
  const topicName = req.params.topicName.toLowerCase();
  const topic = topics.find((t) => t.name === topicName);
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  const filteredBlogs = blogs.filter((blog) => blog.topicId === topic.id);
  res.json(filteredBlogs);
});

app.get("/api/blogs/:blogId", (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const blog = blogs.find((b) => b.id === blogId);
  if (blog) res.json(blog);
  else res.status(404).json({ message: "Blog not found" });
});

// ----------- AUTHENTICATION ROUTES -----------

// Signup
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  if (users[email]) {
    return res.status(400).json({ message: "User already exists" });
  }

  users[email] = password;
  res.status(201).json({ message: "Signup successful" });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const storedPassword = users[email];
  if (!storedPassword) {
    return res.status(400).json({ message: "User not found" });
  }

  if (storedPassword !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
