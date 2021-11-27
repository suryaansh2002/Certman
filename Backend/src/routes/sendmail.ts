export {};
const fs = require("fs");
let express = require("express");
const router = express.Router();
const EmailedCertModel = require("../models/EmailedCert");
const ShortUniqueId = require("short-unique-id");
let multer = require("multer"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");

var request = require("request");

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
  const { subject, user, certUrl, type, coordinates } = req.body;
  var content = req.body.content;

  const width = 700;
  const height = 500;

  loadImage(certUrl).then(async (image) => {
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

    if (type == "wc" || type == "mc") {
      context.fillText(user.name, coordinates.name[1], coordinates.name[0]);
    }
    if (type == "org") {
      context.fillText(user.name, coordinates.name[1], coordinates.name[0]);
      context.fillText(
        user.event_name,
        coordinates.event[1],
        coordinates.event[0]
      );
      context.fillText(
        user.event_date,
        coordinates.event_date[1],
        coordinates.event_date[0]
      );
    }
    if (type == "won") {
      context.fillText(user.name, coordinates.name[1], coordinates.name[0]);
      context.fillText(
        user.event_name,
        coordinates.event[1],
        coordinates.event[0]
      );
      context.fillText(
        user.event_date,
        coordinates.event_date[1],
        coordinates.event_date[0]
      );
      context.fillText(
        user.position,
        coordinates.position[1],
        coordinates.position[0]
      );
    }

    const buffer = canvas.toBuffer("image/png");

    const filePath = `./emailed-cert-uploads/${user.name}.png`;

    await fs.writeFile(filePath, buffer, (err, data) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");

        const emailedCert = new EmailedCertModel({
          _id: new mongoose.Types.ObjectId(),
          emailedCertUrl: url + "/emailed-cert-uploads/" + `${user.name}.png`,
        });
        emailedCert
          .save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err),
              res.status(500).json({
                error: err,
              });
          });
      }
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
