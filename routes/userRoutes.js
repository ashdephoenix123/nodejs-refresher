const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", verifyToken, currentUser);

module.exports = router;
