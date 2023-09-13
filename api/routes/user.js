const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send({ users });
});

router.post("/create", async (req, res) => {
  const user = new User(req.body);
  await user.save();

  res.status(200).send(req.body);
});

router.get("/:username", async (req, res) => {
  const user = await User.find({ username: req.params.username });

  if (user.length > 0) {
    res.status(200).send(user);
  } else {
    res.status(200).send({});
  }
});

router.delete("/:username", (req, res) => {});

module.exports = router;