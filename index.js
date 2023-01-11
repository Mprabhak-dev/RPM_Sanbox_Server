const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const sessionRouter = require("./routes/sessionRoutes");
const { createDir } = require("./util/helperFunctions");
// const multer = require("multer");
// const router = express.Router();
// var fs = require("fs");
// const SessionInfo = require("./models/Session");

const PORT = process.env.PORT || 5000;

// app.use("/logs", express.static(path.join(__dirname, "/logs")));

createDir("./logs");

app.use(cors());
app.use(express.json());
//app.use(express.urlencoded())

app.use("/users", userRouter);
app.use("/sessions", sessionRouter);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "logs");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${new Date().getTime()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/uploads", upload.single("file"), function (req, res) {
//   console.log("Received file" + req.file.originalname);
//   let data = {
//     type: req.body["type"],
//     userId: req.body["userId"],
//     sessionId: req.body["sessionId"],
//     logFilePath: req.file.path,
//   };
//   var destDir = `logs/${data["userId"]}/${data["sessionId"]}`;
//   if (!fs.existsSync(destDir)) {
//     fs.mkdirSync(destDir, {
//       recursive: true,
//     });
//   }
//   var src = fs.createReadStream(req.file.path);
//   var dest = fs.createWriteStream(`${destDir}/${req.file.originalname}`);
//   src.pipe(dest);
//   src.on("end", function () {
//     fs.unlinkSync(req.file.path);
//     res.json("OK: received " + req.file.originalname);
//   });
//   src.on("error", function (err) {
//     res.json("Something went wrong!");
//   });
// });

// app.post("/upload", upload.array("files"), async function (req, res) {
//   // console.log("Received files" + JSON.stringify(req.files));
//   let data = {
//     userId: req.body["userId"],
//     sessionId: req.body["sessionId"],
//     startTime: req.body["startTime"],
//     endTime: req.body["endTime"],
//     timeZoneInSec: req.body["timeZoneInSec"],
//   };
//   var destDir = `logs/${data["userId"]}/${data["sessionId"]}`;

//   var types = req.body["type"].split("-");
//   var filePaths = [];

//   for (const [index, file] of req.files.entries()) {
//     var logInfo = {};
//     var newDir = `${destDir}/${types[index]}`;
//     createDir(newDir);
//     var newPath = `${newDir}/${file.originalname}`;
//     logInfo.filePath = newPath;
//     logInfo.fileSize = file.size;
//     logInfo.deviceType = types[index];
//     filePaths.push(logInfo);
//     var src = fs.createReadStream(file.path);
//     var dest = fs.createWriteStream(newPath);
//     src.pipe(dest);
//     src.on("end", function () {
//       fs.unlinkSync(file.path);
//       // res.json("OK: received " + req.file.originalname);
//       console.log("OK: received " + file.originalname);
//     });
//     src.on("error", function (err) {
//       // res.json("Something went wrong!");
//       console.log("Something went wrong!");
//     });
//   }

//   //data["types"] = types;
//   data["logs"] = filePaths;
//   console.log(`Data : ${JSON.stringify(data)}`);

//   const newSession = new SessionInfo(data);
//   try {
//     const saveSession = await newSession.save();
//     res.status(200).json("File uploded and session saved successfully");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// function createDir(dir) {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, {
//       recursive: true,
//     });
//   }
// }
// app.post("/upload", upload.single("file"), (req, res) => {
//   try {
//     console.log("entered upload route");
//     let data = {
//       type: req.body["type"],
//       userId: req.body["userId"],
//       sessionId: req.body["sessionId"],
//       logFilePath: req.file.path,
//     };
//     console.log(`Received data : ${JSON.stringify(data)}`);
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`RPM Server Running at ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
