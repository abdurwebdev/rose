import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://rose-6tyh.vercel.app/api/auth/login", formData);
      setMessage(res.data.message);

      if (res.data.message === "Login successful") {
        localStorage.setItem("token", res.data.token); // Save JWT
        localStorage.setItem("username", formData.username); // Optional: save username
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.error || err.response.data.message);
      } else {
        setMessage("An error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md p-2 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
        {message && (
          <p className="text-red-500 text-sm mt-3 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
