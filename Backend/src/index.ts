require("dotenv").config();
const express = require("express");

const InitiateMongoServer = require("./config/db");
const authRoute = require("./routes/auth");
const certRoute = require("./routes/cert.ts");
const csvRoute = require("./routes/csv.ts");
const sendMailRoute = require("./routes/sendmail.ts");

const cors = require("cors");

InitiateMongoServer();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const PORT = process.env.PORT || 5000;

app.use("/cert-uploads", express.static("cert-uploads"));
app.use("/csv-uploads", express.static("csv-uploads"));
app.use("/api/cert", certRoute);
app.use("/api/csv", csvRoute);
app.use("/api/sendmail", sendMailRoute);

app.use("/api/auth", authRoute);
app.listen(PORT, (req: any, res: any) => {
  console.log(`Server Started at PORT ${PORT}`);
});
