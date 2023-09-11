const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send({ message: "hello world!" });
  //   console.log(PORT);
});

app.listen(PORT);
