const express = require("express");
const { registerUser } = require("../controller/registerController");
const { checkUserRegistration } = require("../controller/checkRegisterController"); // ✅ Import new controller

const router = express.Router();

router.post("/register", registerUser);
router.post("/check-registration", checkUserRegistration);
module.exports = router;
