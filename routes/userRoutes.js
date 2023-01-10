const router = require("express").Router();

const {
  createUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

router.get("/:userName", getUser);
router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
