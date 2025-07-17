const express = require("express"); 
const app = express(); 
const dbconfig = require("./config/dbconfig");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
dbconfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;