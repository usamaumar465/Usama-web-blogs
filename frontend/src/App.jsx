import React from "react";
import { Routes, Route } from "react-router-dom";
import Topics from "./pages/topiccard/Topiccard";
import BlogList from "./pages/Bloglist/Bloglist";
import BlogDetail from "./pages/Blogdetails/Blogdetail";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/topics/:topicName" element={<BlogList />} />
      <Route path="/topics/:topicName/:blogId" element={<BlogDetail />} />
    </Routes>
  );
}

export default App;
