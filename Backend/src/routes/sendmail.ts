export {};
const fs = require("fs");
const express = require("express");
const router = express.Router();
const Users = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createCanvas, loadImage } = require("canvas");

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

router.post("/cert", async (req: any, res: any) => {
  const { subject, content, user, certUrl } = req.body;

  const width = 700;
  const height = 500;

  loadImage(certUrl).then(
    (image) => {
      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");

      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, 700, 500);
      context.font = "20px Arial";
      context.textAlign = "left";
      context.textBaseline = "top";
      context.fillStyle = "black";
      context.fillText(user.name, 280, 300);
      
      const buffer = canvas.toBuffer("image/png");

      let transporter = nodemailer.createTransport({
        service: "Outlook365",
        host: "smtp.office365.com",
        port: "587",
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
        auth: {
          //   user: "temp_certman@outlook.com",
          user: "temp_cert@outlook.com",

          pass: "123@ABC@abc",
        },
      });

      const options = {
        // from: "temp_certman@outlook.com",
        from: "temp_cert@outlook.com",

        to: user.email,
        subject: subject,
        text: content,
        attachments: [
          {
            // utf-8 string as an attachment
            filename: `${user.name}.png`,
            content: buffer,
          },
        ],
      };

      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          res.json({ status: "error", error: err, data: user, buffer });

          return;
        }
        res.json({ status: "success", error: "", data: user, info, buffer });
      });
    }
  );
});

module.exports = router;
