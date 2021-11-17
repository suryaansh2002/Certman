export {};
let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");
const router = express.Router();
const CertModel = require("../models/CertModel");

const DIR = "./cert-uploads/";

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
//multer stuff ends

//to upload a new certificate
router.post("/cert-upload", upload.single("certUrl"), (req, res, next) => {
  if (req.file === undefined)
    return res.status(404).send("You must select a file.");
  const url = req.protocol + "://" + req.get("host");
  const cert = new CertModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    certUrl: url + "/cert-uploads/" + req.file.filename,
  });
  cert
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

//for all uploaded certificates
router.get("/", (req, res, next) => {
  CertModel.find().then((data) => {
    res.status(200).send(data);
  });
});

//for single certificate
router.get("/:id", async (req, res) => {
  try {
    const cert = await CertModel.findById(req.params.id);
    console.log(cert);
    res.status(200).json(cert);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
