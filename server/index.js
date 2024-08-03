const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = 3000;
const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }
};

start();
