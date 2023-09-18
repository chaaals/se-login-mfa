require("dotenv").config();

const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
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

// creates jwt for verification
router.post("/create", async (req, res) => {
  const [existingUserEmail] = await User.find({ email: req.body.email });

  const [existingUserName] = await User.find({ username: req.body.username });

  if (
    existingUserName?.username === req.body.username ||
    existingUserEmail?.email === req.body.email
  ) {
    res.status(200).send({
      invalid_email: existingUserEmail?.email === req.body.email,
      invalid_username: existingUserName?.username === req.body.username,
    });
  } else {
    const token = jwt.sign({ body: req.body }, process.env.SIGNUP_KEY, {
      expiresIn: "1h",
    });

    await transporter.sendMail(
      {
        from: {
          name: "Dev",
          address: process.env.APP_USER,
        },
        to: req.body.email,
        subject: "Email verification",
        html: `
          <h1 style="text-align: center;">Welcome aboard!</h1>
          <p style="font-size: 1.25rem; color: #213547; text-align: center;">Please <a 
          href="${process.env.HOST}sign-up?verify=${token}"
          target="_blank"
          style="font-size: 1.25rem; color: #213547; text-align: center; font-weight: bold;"
          >verify</a> your email address.</p>
        `,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      }
    );

    res.status(200).send({
      user_created: true,
    });
  }
});

// verify email and registering user using jwt
router.post("/create/verify/:token", async (req, res) => {
  const token = req.params.token;

  jwt.verify(token, process.env.SIGNUP_KEY, async (err, decoded) => {
    if (err) {
      res.status(200).send({
        message: "Invalid token. User registration failed.",
        status: {
          success: false,
          error: true,
        },
      });

      return;
    }

    const user = new User(decoded.body);
    await user.save();

    res.status(200).send({
      message: "User registration successful!",
      status: {
        success: true,
        error: false,
      },
    });
  });
});

// logs in using jwt
router.get("/login/:token", async (req, res) => {
  const token = req.params.token;

  jwt.verify(token, process.env.LOGIN_KEY, async (err, decoded) => {
    if (err) {
      res.status(200).send({
        message: "Invalid token. Token must've expired or wrong token.",
        status: {
          success: false,
          error: true,
        },
      });

      return;
    }

    const [user] = await User.find({ username: decoded.username });

    res.status(200).send(user);
  });
});

// generates a JWT containing user details including generated otp
router.put("/login/:username", async (req, res) => {
  const [user] = await User.find({ username: req.params.username });

  if (!user?.username || user?.password !== req?.body?.password) {
    res.status(200).send({});
  } else {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: true,
    });

    try {
      const token = jwt.sign({ ...user.toObject(), otp }, process.env.OTP_KEY, {
        expiresIn: "1h",
      });

      await transporter.sendMail(
        {
          from: {
            name: "Dev",
            address: process.env.APP_USER,
          },
          to: user.email,
          subject: "Verify your log in attempt",
          html: `<h1 style='text-align: center;'>OTP - ${otp}</h1>`,
        },
        (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent successfully:", info.response);
          }
        }
      );

      res.status(200).send({ token });
    } catch (e) {
      console.log(e);
    }
  }
});

// OTP login and uses JWT
router.post("/verify/:token", async (req, res) => {
  jwt.verify(req.params.token, process.env.OTP_KEY, async (err, decoded) => {
    if (err) {
      res.status(200).send({
        message: "Invalid token. Token must've expired or wrong token.",
        status: {
          success: false,
          error: true,
        },
      });
      return;
    }
    const [user] = await User.find({ username: decoded.username });

    if (req.body.otp === decoded.otp) {
      try {
        const token = jwt.sign({ ...user.toObject() }, process.env.LOGIN_KEY, {
          expiresIn: "1h",
        });

        res.status(200).send({ ...user.toObject(), token });
      } catch (e) {
        console.log(e);
      }
    } else {
      res.status(200).send({});
    }
  });
});

router.get("/:username", async (req, res) => {
  const [user] = await User.find({ username: req.params.username });

  if (user._id) {
    res.status(200).send(user);
  } else {
    res.status(200).send({ message: "hello world" });
  }
});

module.exports = router;
