import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://rose-6tyh.vercel.app/api/auth/login", formData);
      setMessage(res.data.message);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.error || err.response.data.message);
      } else {
        setMessage("An error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          className="border border-gray-300 rounded-md p-2"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Login</button>
      </form>
      <a href="/register" className="mt-4 text-blue-500 underline">Register</a>
      <p className="text-red-500">{message}</p>
    </div>
  );
};

export default Login;