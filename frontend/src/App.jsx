import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UploadVideo from './pages/UploadVideo';
import VideoDetails from './pages/VideoDetails';

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
      <Route path="/upload" element={isAuthenticated ? <UploadVideo /> : <Navigate to="/" />} />
      <Route path="/video/:id" element={<VideoDetails />} />
    </Routes>
  );
}

export default App;
