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

const DIR = "./csv-uploads/";

const storage_new = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload_new = multer({
  storage: storage_new,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

//to upload a new csv file
router.post("/csv-upload", upload_new.single("csv"), (req, res, next) => {
  try {

    if (req.file === undefined)
      return res.status(404).send("You must select a file.");
    let path = DIR + req.file.filename;
    var results = [];

    fs.createReadStream(path)
      .pipe(csv({}))
      .on("data", (data) => results.push(data))
      .on("end", () => res.status(200).send(results));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
