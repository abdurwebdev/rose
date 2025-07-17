// Home.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome Home!</h1>
      <p className="mt-4">You are logged in.</p>
      <button onClick={handleLogout} className="mt-6 bg-red-500 text-white rounded-md p-2">Logout</button>
    </div>
  );
};

export default Home;