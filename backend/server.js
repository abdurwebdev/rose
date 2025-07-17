const express = require("express"); 
const app = express(); 
const dbconfig = require("./config/dbconfig");
const authRoutes = require("./routes/authRoutes");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cors = require("cors");
dbconfig();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://rose-pvng.vercel.app", 
  credentials: true
}));

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "videos",
    resource_type: "video",
  },
});
const upload = multer({ storage });

// MongoDB Schemas
const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      replies: [{
        text: String,
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
      }],
    },
  ],
});
const Video = mongoose.model("Video", videoSchema);

// Upload Route
app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const newVideo = new Video({ title: req.body.title, url: req.file.path });
    await newVideo.save();
    res.status(200).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all videos
app.get("/videos", async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// Like/Dislike Video
app.post("/videos/:id/like", async (req, res) => {
  await Video.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
  res.sendStatus(200);
});

app.post("/videos/:id/dislike", async (req, res) => {
  await Video.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } });
  res.sendStatus(200);
});

// Comment and Replies
app.post("/videos/:id/comment", async (req, res) => {
  const { text } = req.body;
  const video = await Video.findById(req.params.id);
  video.comments.push({ text, replies: [] });
  await video.save();
  res.status(200).json(video);
});

app.post("/videos/:videoId/comment/:commentIndex/reply", async (req, res) => {
  const { text } = req.body;
  const video = await Video.findById(req.params.videoId);
  video.comments[req.params.commentIndex].replies.push({ text });
  await video.save();
  res.status(200).json(video);
});

// Subscribe learner (dummy route)
app.post("/subscribe", (req, res) => {
  res.status(200).json({ message: "Subscribed as learner" });
});


module.exports = app;