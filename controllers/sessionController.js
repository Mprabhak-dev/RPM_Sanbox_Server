const Session = require("../models/Session");
var fs = require("fs");
const { createDir } = require("../util/helperFunctions");
const path = require("path");
__dirname = path.resolve();

const createSession = async (req, res) => {
  let data = {
    userId: req.body["userId"],
    startTime: req.body["startTime"],
    endTime: req.body["endTime"],
    timeZoneInSec: req.body["timeZoneInSec"],
  };
  var destDir = `logs/${data["userId"]}`;

  var types = req.body["type"].split("-");
  var filePaths = [];

  for (const [index, file] of req.files.entries()) {
    var logInfo = {};
    var newDir = `${destDir}/${types[index]}`;
    createDir(newDir);
    var newPath = `${newDir}/${file.originalname}`;
    logInfo.filePath = newPath;
    logInfo.fileSize = file.size;
    logInfo.deviceType = types[index];
    filePaths.push(logInfo);
    var src = fs.createReadStream(file.path);
    var dest = fs.createWriteStream(newPath);
    src.pipe(dest);
    src.on("end", function () {
      fs.unlinkSync(file.path);
      // res.json("OK: received " + req.file.originalname);
      console.log("OK: received " + file.originalname);
    });
    src.on("error", function (err) {
      // res.json("Something went wrong!");
      console.log("Something went wrong!");
    });
  }

  //data["types"] = types;
  data["logs"] = filePaths;
  console.log(`Data : ${JSON.stringify(data)}`);

  const newSession = new Session(data);
  try {
    const saveSession = await newSession.save();
    res.status(200).json(saveSession);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSessions = async (req, res) => {
  try {
    console.log(`userId : ${req.params.userId}`);
    var sessions = await Session.find({ userId: req.params.userId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    const { sessionId, fileId } = req.params;
    console.log(`Server: sessionId ${sessionId} fileId ${fileId}`);
    const session = await Session.findById(sessionId);
    const fileInfo = session.logs;
    console.log(JSON.stringify(fileInfo));
    var fileInfoItem = null;
    for (const item of fileInfo) {
      console.log(item._id.toString());
      if (item._id.toString() === fileId) {
        fileInfoItem = item;
        break;
      }
    }
    console.log(JSON.stringify(fileInfoItem));
    if (fileInfoItem) {
      console.log("entering");
      const filepath = path.join(__dirname, fileInfoItem.filePath);
      console.log("filepath = " + filepath);
      res.set({
        "Content-Type": "text/csv",
      });
      res.sendFile(filepath);
    }
    // res.status(404).send("No file id matched with records");
  } catch (err) {
    res.status(400).send("Error while downloading file try again.");
  }
};

const getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    res.status(200).json(session);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getSession, getSessions, createSession, downloadFile };
