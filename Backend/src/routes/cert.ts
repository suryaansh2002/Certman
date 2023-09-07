export {};
let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");
const router = express.Router();
const CertModel = require("../models/CertModel");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "certmanbucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    key: function (req, file, cb) {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, "cert-uploads/"+uuidv4() + "-" + fileName);
    },
  }),
});

//to upload a new certificate
router.post("/cert-upload", upload.single("certUrl"), (req, res, next) => {
  if (req.file === undefined)
    return res.status(404).send("You must select a file.");
  const url = req.protocol + "://" + req.get("host");
  const cert = new CertModel({
    _id: new mongoose.Types.ObjectId(),
    certUrl: req.file.location,
  });
  cert
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
});

//to update the certificate details
router.put("/cert-upload-details", async (req, res, next) => {
  const { certId, category, userId, coordinates } = req.body;
  console.log(certId);
  try {
    const updatedCert = await CertModel.updateOne(
      { _id: certId },
      { $set: { category: category, userId: userId, coordinates: coordinates } }
    );

    // const updatedCert = await CertModel.update(
    //   certId,
    //   {
    //     $set: { category: category, userId: userId, coordinates: coordinates },
    //   },
    // );

    res.status(200).json(updatedCert);
    console.log("Done");
  } catch (err) {
    res.status(500).json(err);
  }
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
router.delete("/:id", async (req, res) => {
  try {
    const cert = await CertModel.deleteOne({ _id: req.params.id });
    res.status(200).json(cert);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
