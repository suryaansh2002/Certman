export {};
const fs = require("fs");
let express = require("express")
const router = express.Router();
const EmailedCertModel = require("../models/EmailedCert");
const ShortUniqueId = require("short-unique-id");
let multer = require("multer"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createCanvas, loadImage } = require("canvas");

const jwt_decode = require("jwt-decode");

const JWT_SECRET = "certmanjwtsecret";

const nodemailer = require("nodemailer");

const DIR = "./emailed-certs/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/", (req: any, res: any) => {
  try {
    res.json({ message: "Welcome to user" });
  } catch (err) {
    console.log(err);

    res.json({ message: err });
  }
});

router.post("/cert", async (req: any, res: any) => {
  const { subject, user, certUrl } = req.body;
  var content = req.body.content;

  const width = 700;
  const height = 500;

  loadImage(certUrl).then((image) => {
    const url = req.protocol + "://" + req.get("host");
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
    const uid = new ShortUniqueId({ length: 10 });

    const emailedCert = new EmailedCertModel({
      _id: new mongoose.Types.ObjectId(),
      emailedCertUrl: url + "/iecse/certificates/" + uid() + "/" + user.name,
    });

    emailedCert
      .save()
      .then((result) => {
        res.send(result);
        content = content + result.emailedCertUrl;
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });

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
  });
});

module.exports = router;
