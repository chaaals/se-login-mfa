require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI)
  .then(() => app.listen(PORT))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRoutes);
