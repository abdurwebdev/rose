// VideoDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://rose-6tyh.vercel.app/api/videos/${id}`)
      .then(res => {
        setVideo(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!video) return <p className="text-center mt-10">Video not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-4">
        <video src={video.videoUrl} controls className="w-full rounded" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">{video.title}</h1>
        <p className="text-gray-600 mt-2">{video.description}</p>
        <p className="text-sm text-gray-500 mt-4">Likes: {video.likes.length} | Dislikes: {video.dislikes.length}</p>
      </div>
    </div>
  );
};

export default VideoDetails;