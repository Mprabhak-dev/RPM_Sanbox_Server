const router = require("express").Router();
const {
  getSession,
  getSessions,
  createSession,
  downloadFile,
} = require("../controllers/sessionController");

const upload = require("../util/uploadConfig");

// router.get("/:sessionId", getSession);
router.get("/:userId", getSessions);
router.get("/:sessionId/download/:fileId", downloadFile);
router.post("/", upload.array("files"), createSession);

module.exports = router;
