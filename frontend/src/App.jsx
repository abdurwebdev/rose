import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VideoDetails from './pages/VideoDetails';
import UploadVideo from './pages/UploadVideo';
function App() {

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/video/:id" element={<VideoDetails />} />
      </Routes>
  )
}

export default App
