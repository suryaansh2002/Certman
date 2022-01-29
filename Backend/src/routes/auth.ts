export {};
require("dotenv").config();

const express = require("express");
const router = express.Router();
const Users = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_decode = require("jwt-decode");

const JWT_SECRET = "certmanjwtsecret";

const nodemailer = require("nodemailer");

router.get("/", (req: any, res: any) => {
  try {
    res.json({ message: "Welcome to user" });
  } catch (err) {
    console.log(err);

    res.json({ message: err });
  }
});

router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || typeof email !== "string" || email.indexOf("@") == -1) {
    return res.json({ status: "error", error: "Invalid Email" });
  }
  if (!password || typeof password !== "string") {
    return res.json({ status: "error", error: "Invalid Password" });
  }

  const user = await Users.findOne({ email }).lean();

  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    if (user.confirmed == false) {
      return res.json({ status: "error", error: "Account not verified" });
    } else {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          JWT_SECRET
        );
        var payload = jwt_decode(token);

        return res.json({ status: "success", error: "", data: payload });
      } else {
        return res.json({
          status: "error",
          error: "Incorrect Password",
          data: "",
        });
      }
    }
  }
});
router.post("/signup", async (req: any, res: any) => {
  console.log(req.body);
  const { name, email, password: plainTextPassword, role } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    if (!name || typeof name !== "string") {
      return await res.json({ status: "error", error: "Invalid Name" });
    }
    if (!email || typeof email !== "string" || email.indexOf("@") == -1) {
      return await res.json({ status: "error", error: "Invalid Email" });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      return await res.json({ status: "error", error: "Invalid Password" });
    }
    if (!role || typeof role !== "string") {
      return await res.json({ status: "error", error: "Please select a role" });
    }
    if (plainTextPassword.length < 6) {
      return res.json({
        status: "error",
        error: "Password should be atleast 6 characters long.",
      });
    }
    const response = await Users.create({
      name,
      email,
      password,
      role,
    });
    return res.json({ status: "success", error: "" });
  } catch (error: any) {
    if ((error.code = 11000)) {
      return res.json({ status: "error", error: "Email ID already used." });
    }
    throw error;
  }
});

router.post("/forgot", async (req: any, res: any) => {
  const { email } = req.body;
  const user = await Users.findOne({ email }).lean();
  console.log("forgot", user);
  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    const secret = JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:3000/reset/${user._id}/${token}`;
    // console.log(link)

    let transporter = nodemailer.createTransport({
      service: "hotmail",
   
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });


    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Certman Password",
      text: `Reset your password at ${link}`,
    };

    console.log(options);
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info);
      res.json({ status: "success", error: "", data: "" });
    });
  }
});

router.patch("/reset", async (req: any, res: any) => {
  const { id, token, pass } = req.body;
  const user = await Users.findOne({ id }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    try {
      const secret = JWT_SECRET + user.password;
      const hash_password = await bcrypt.hash(pass, 10);
      const updatedUser = await Users.updateOne(
        { _id: id },
        {
          $set: {
            password: hash_password,
          },
        }
      );
      res.json({ status: "success", error: "", data: "" });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: error.message, data: "" });
    }
  }
});

router.post("/verify", async (req: any, res: any) => {
  const { email } = req.body;
  const user = await Users.findOne({ email }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    const link = `http://localhost:3000/verify/${user._id}`;
    console.log("in verify");
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      // host: "smtp.office365.com",
      // port: "587",
      // tls: {
      //   ciphers: "SSLv3",
      //   rejectUnauthorized: false,
      // },
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "Certman: Verify your account",
      text: `Verify your account at ${link}`,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info);
      res.json({ status: "success", error: "", data: "" });
    });
  }
});

router.patch("/verifyacc", async (req: any, res: any) => {
  const { id } = req.body;
  const user = await Users.findOne({ id }).lean();
  if (!user) {
    console.log("e1");
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    try {
      // const secret = JWT_SECRET + user.password;
      // const hash_password = await bcrypt.hash(pass, 10);
      const updatedUser = await Users.updateOne(
        { _id: id },
        {
          $set: {
            confirmed: true,
          },
        }
      );
      res.json({ status: "success", error: "", data: "" });
    } catch (error) {
      res.json({ status: "error", error: error.message, data: "" });
    }
  }
});

module.exports = router;
