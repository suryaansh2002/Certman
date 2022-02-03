export {};
let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  { v1: uuidv1, v4: uuidv4 } = require("uuid");
const router = express.Router();
const User = require("../models/CertModel");

const csv = require("csv-parser");
const fs = require("fs");
const obj = [];

const csvDir = "./csv-uploads/";
const signDir = "./sign-uploads/";

const storage_csv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, csvDir);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload_csv = multer({
  storage: storage_csv,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

const storage_signs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, signDir);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload_signs = multer({
  storage: storage_signs,
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

//to upload a new csv file
router.post("/csv-upload", upload_csv.single("csv"), (req, res, next) => {
  try {
    if (req.file === undefined)
      return res.status(404).send("You must select a file.");
    let path = csvDir + req.file.filename;
    var results = [];

    fs.createReadStream(path)
      .pipe(csv({}))
      .on("data", (data) => results.push(data))
      .on("end", () => res.status(200).send(results));
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

      const url = req.protocol + "://" + req.get("host");
      res.status(200).send(url + "/sign-uploads/" + req.file.filename);
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

      const url = req.protocol + "://" + req.get("host");
      res.status(200).send(url + "/sign-uploads/" + req.file.filename);
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = router;
