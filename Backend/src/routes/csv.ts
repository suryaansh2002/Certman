export {};
let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  { v1: uuidv1, v4: uuidv4 } = require("uuid");
const router = express.Router();
const User = require("../models/CertModel");

const csv = require('csvtojson');
const fs = require("fs");
const obj = [];

var key = "";
const signDir = "./sign-uploads/";

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

var params = { Bucket: "certmanbucket", Key: "" };

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload_csv = multer({
  storage: multerS3({
    s3,
    bucket: "certmanbucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    key: function (req, file, cb) {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      var tempKey = "csv-uploads/" + uuidv4() + "-" + fileName;
      cb(null, tempKey);
      params.Key = tempKey;
    },
  }),
});

const upload_signs = multer({
  storage: multerS3({
    s3,
    bucket: "certmanbucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    key: function (req, file, cb) {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, "signatures/" + uuidv4() + "-" + fileName);
    },
  }),
});

//to upload a new csv file
router.post("/csv-upload", upload_csv.single("csv"), async (req, res, next) => {
  try {
    if (req.file === undefined)
      return res.status(404).send("You must select a file.");

    const stream = s3.getObject(params).createReadStream();
    // convert csv file (stream) to JSON format data
    const json = await csv().fromStream(stream);
    res.status(200).send(json);
  } catch (e) {
    console.log(e);
  }
});

router.post(
  "/upload-facsign",
  upload_signs.single("facSign"),
  (req, res, next) => {
    try {
      if (req.file === undefined)
        return res.status(404).send("You must select a file.");

      console.log("Uploaded faculty signature");

      res.status(200).send(req.file.location);
    } catch (e) {
      console.log(e);
    }
  }
);

router.post(
  "/upload-chairsign",
  upload_signs.single("chairSign"),
  (req, res, next) => {
    try {
      if (req.file === undefined)
        return res.status(404).send("You must select a file.");

      console.log("Uploaded chair signature");

      res.status(200).send(req.file.location);
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = router;
