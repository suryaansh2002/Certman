export {};
const fs = require("fs");
let express = require("express");
const router = express.Router();

const EmailedCertModel = require("../models/EmailedCert");
const ShortUniqueId = require("short-unique-id");
var QRCode = require("qrcode");

let multer = require("multer"),
  mongoose = require("mongoose");

import { v4 as uuidv4 } from "uuid";

var request = require("request");

const { createCanvas, loadImage } = require("canvas");
const Canvas = require("canvas");
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
  const { subject, arr2, certUrl, type, coordinates } = req.body;
  console.log(arr2);
  try {
    for (var i = 0; i < arr2.length; i++) {
      console.log(coordinates);
      var user = arr2[i];
      var content = req.body.content;
      var imgLink;
      const uid = uuidv4();
      const url = req.protocol + "://" + req.get("host");

      QRCode.toDataURL(
        url + "/emailed-cert-uploads/" + `${user.name}_${uid}.png`,
        function (err, url) {
          imgLink = url;
        }
      );
      const width = 700;
      const height = 500;

      loadImage(certUrl).then((image) => {
        const url = req.protocol + "://" + req.get("host");
        const canvas = createCanvas(width, height);
        const context = canvas.getContext("2d");

        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, 700, 500);

        var img = new Canvas.Image(); // Create a new Image
        img.src = imgLink;
        // ctx.drawImage(img, coordinates.qr[1], coordinates.qr[0],coordinates.qr[4],coordinates.qr[3]);
        context.drawImage(
          img,
          coordinates.qr[1],
          coordinates.qr[0],
          coordinates.qr[3],
          coordinates.qr[2]
        );
        context.font = "20px Arial";
        context.textAlign = "center";
        context.textBaseline = "top";
        context.fillStyle = "black";

        if (type == "wc" || type == "mc") {
          context.textAlign = "center";
          context.fillText(
            user.name,
            coordinates.name[1] + coordinates.name[2] / 2,
            coordinates.name[0]
          );
        }
        if (type == "org") {
          context.fillText(
            user.name,
            coordinates.name[1] + coordinates.name[2] / 2,
            coordinates.name[0]
          );
          context.fillText(
            user.event,
            coordinates.event[1] + coordinates.event[2] / 2,
            coordinates.event[0]
          );
          context.fillText(
            user.event_date,
            coordinates.date[1] + coordinates.date[2] / 2,
            coordinates.date[0]
          );
        }
        if (type == "comp") {
          context.fillText(
            user.name,
            coordinates.name[1] + coordinates.name[2] / 2,
            coordinates.name[0]
          );
          context.fillText(
            user.event,
            coordinates.event[1] + coordinates.event[2] / 2,
            coordinates.event[0]
          );
          context.fillText(
            user.event_date,
            coordinates.date[1] + coordinates.date[2] / 2,
            coordinates.date[0]
          );
          context.fillText(
            user.position,
            coordinates.position[1] + coordinates.position[2] / 2,
            coordinates.position[0]
          );
        }

        const buffer = canvas.toBuffer("image/png");

        const filePath = `./emailed-cert-uploads/${user.name}_${uid}.png`;

        fs.writeFile(filePath, buffer, (err, data) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully\n");

            const emailedCert = new EmailedCertModel({
              _id: new mongoose.Types.ObjectId(),
              emailedCertUrl:
                url + "/emailed-cert-uploads/" + `${user.name}_${uid}.png`,
            });
            emailedCert
              .save()
              .then((result) => {
                console.log("Certificate Saved");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });

        // const sgMail = require("@sendgrid/mail");
        // sgMail.setApiKey('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');
        // const msg = {
        //   to: user.email,
        //   from: "suryaansh2002@gmail.com", // Use the email address or domain you verified above
        //   subject: subject,
        //   text: content,
        // };
        // sgMail
        // .send(msg)
        // .then(() => {
        //   console.log(user)
        //   console.log('Email sent')
        //   console.log(user.name + "e")

        // })
        // .catch((error) => {
        //   console.error(error.message)
        // })

        let transporter = nodemailer.createTransport({
          service: "hotmail",
          // host: "smtp.office365.com",
          // port: "587",
          // name: "certman",
          // maxConnections: 10,
          // tls: {
          //   ciphers: "SSLv3",
          //   rejectUnauthorized: false,
          // },
          auth: {
            //   user: "temp_certman@outlook.com",
            user: process.env.EMAIL,

            pass: process.env.PASSWORD,
          },
        });
        const options = {
          // from: "temp_certman@outlook.com",
          from: process.env.EMAIL,

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

        transporter.sendMail(options, async function (err, info) {
          if (err) {
            console.log(err);
            res.json({ status: "error", error: err, data: user, buffer });

            return;
          }
          console.log(info);
          res.json({
            status: "success",
            error: "",
            data: user,
            info,
            buffer,
          });
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
