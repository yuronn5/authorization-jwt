require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }
};

start();
