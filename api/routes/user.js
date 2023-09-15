require("dotenv").config();

const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send({ users });
});

router.post("/create", async (req, res) => {
  const existingUser = await User.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });

  if (existingUser.length > 0) {
    res.status(200).send({ message: "this user exists" });
  } else {
    const user = new User(req.body);
    await user.save();

    res.status(200).send(req.body);
  }
});

router.put("/login/:username", async (req, res) => {
  const [user] = await User.find({ username: req.params.username });

  if (!user?.username || user?.password !== req?.body?.password) {
    res.status(200).send({});
  } else {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    try {
      const updatedUser = await User.findOneAndUpdate(
        { username: req.params.username },
        { otp },
        { new: true }
      );

      await transporter.sendMail(
        {
          from: {
            name: "Dev",
            address: process.env.APP_USER,
          },
          to: updatedUser.email,
          subject: "Verify your log in attempt",
          html: `<h1 style='text-align: center;'>OTP - ${updatedUser.otp}</h1>`,
        },
        (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent successfully:", info.response);
          }
        }
      );

      res.status(200).send(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
});

router.post("/verify/:username", async (req, res) => {
  const [user] = await User.find({ username: req.params.username });

  if (req.body.otp === user.otp) {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { otp: "" },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } else {
    res.status(200).send({});
  }
});

router.get("/:username", async (req, res) => {
  const [user] = await User.find({ username: req.params.username });

  if (user._id) {
    res.status(200).send(user);
  } else {
    res.status(200).send({ message: "hello world" });
  }
});

// router.delete("/:username", (req, res) => {});

module.exports = router;
