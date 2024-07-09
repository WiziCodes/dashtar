const express = require("express");
const router = express.Router();
const {
  registerVendor,
  getAllVendors,
  loginVendor,
  forgetPassword,
  resetPassword,
  ratingSystem,
} = require("../controller/vendorController");
const { passwordVerificationLimit } = require("../lib/email-sender/sender");

//register a vendor
router.get("/", getAllVendors);
//register a vendor
router.post("/register", registerVendor);

router.post("/login", loginVendor);
router.put("/forget", passwordVerificationLimit, forgetPassword);
// router.put("/reset/:token", resetPassword);
router.put("/reset", resetPassword);

// ratingSystem
router.put("/rating/:vendorId", ratingSystem);

module.exports = router;
