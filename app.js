const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const userrouter = require("./routes/userrouter");
const adminrouter = require("./routes/adminrouter");

const app = express();

const corsOptions ={
  origin: ["https://main.dffrwd7ebpz4s.amplifyapp.com/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders:"Content-Type,Authorization",
  optionsSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use(express.json({limit: "2MB"}));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/", userrouter);
app.use("/admin", adminrouter);

module.exports = app;
