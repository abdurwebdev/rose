// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/";
    };
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return navigate('/');
    setUser(storedUser);

    axios.get('https://rose-6tyh.vercel.app/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full font-sans">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyAgency</h1>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li><a href="#home" className="hover:text-blue-600">Home</a></li>
            <li><a href="#services" className="hover:text-blue-600">Services</a></li>
            <li><a href="#videos" className="hover:text-blue-600">Videos</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
    
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col items-center justify-center text-center bg-blue-50 pt-20">
        <h2 className="text-4xl font-bold text-blue-800">We Build Stunning Digital Experiences</h2>
        <p className="mt-4 text-gray-600 max-w-xl">At MyAgency, we help you create award-winning websites, powerful branding, and effective marketing strategies to grow your business.</p>
        {user?.username === 'iabdurrehman12345' && (
          <Link to="/upload" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
            Upload Video
          </Link>
        )}
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {["Web Development", "UI/UX Design", "SEO Optimization", "Branding", "E-commerce Solutions", "Digital Marketing"].map((title, index) => (
              <div key={index} className="border p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <h4 className="text-xl font-semibold text-blue-600 mb-3">{title}</h4>
                <p className="text-gray-600">Service description for {title.toLowerCase()}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">Latest Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map(video => (
              <Link to={`/video/${video._id}`} key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="w-full h-48 bg-gray-200">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 text-md mb-2">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-500">{video.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Likes: {video.likes.length} · Dislikes: {video.dislikes.length}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MyAgency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;