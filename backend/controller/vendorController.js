const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signInToken, tokenForVerify, vendorToken } = require("../config/auth");
const { sendEmail } = require("../lib/email-sender/sender");
const Vendor = require("../models/Vendor");

const getAllVendors = async (req, res) => {
  // console.log('allamdin')
  try {
    const vendor = await Vendor.find({}).sort({ _id: -1 });
    res.send(vendor);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const registerVendor = async (req, res) => {
  try {
    const isAdded = await Vendor.findOne({ auth_email: req.body.email });
    if (isAdded) {
      return res.status(500).send({
        message: "This Email already Added!",
      });
    } else {
      const newVendor = new Vendor({
        vendor_name: req.body.vendor_name,
        vendor_phone: req.body.vendor_phone,
        store_name: req.body.store_name,
        store_type: req.body.store_type,
        store_address: req.body.store_address,
        store_coverImg: req.body.store_coverImg,
        store_profileImg: req.body.store_profileImg,
        auth_email: req.body.auth_email,
        auth_password: bcrypt.hashSync(req.body.auth_password),
      });
      await newVendor.save();
      res.status(200).send({
        message: "Vendor Added Successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
    // console.log("error", err);
  }
};

const loginVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ auth_email: req.body.auth_email });
    if (
      vendor &&
      bcrypt.compareSync(req.body.auth_password, vendor.auth_password)
    ) {
      const token = signInToken(vendor);
      res.send({
        token,
        _id: vendor._id,
        vendor_name: vendor.vendor_name,
        vendor_phone: vendor.vendor_phone,
        auth_email: vendor.auth_email,
        store_profileImg: vendor.store_profileImg,
      });
    } else {
      res.status(401).send({
        message: "Invalid Email or password!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  const isAdded = await Vendor.findOne({ auth_email: req.body.verifyEmail });
  if (!isAdded) {
    return res.status(404).send({
      message: "Admin/Staff Not found with this email!",
    });
  } else {
    const token = vendorToken(isAdded);
    const body = {
      // the reset password url is meant to be the link to the resetPassword page on the front-end
      //this link won't work now as the page has not been created
      from: process.env.EMAIL_USER,
      to: `${req.body.verifyEmail}`,
      subject: "Password Reset",
      html: `<h2>Hello ${req.body.verifyEmail}</h2>
      <p>A request has been received to change the password for your <strong>Kachabazar</strong> account </p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>
        <a href=${process.env.ADMIN_URL}/reset-password/${token}  style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password </a>
      
        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Kachabazar Team</strong>
             `,
    };
    const message = "Please check your email to reset password!";
    sendEmail(body, res, message);
  }
};

const resetPassword = async (req, res) => {
  // const token = req.params.token;
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const vendor = await Vendor.findOne({ auth_email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: "Token expired, please try again!",
        });
      } else {
        vendor.auth_password = bcrypt.hashSync(req.body.auth_password);
        vendor.save();
        res.send({
          message: "Your password change successful, you can login now!",
        });
      }
    });
  }
};

const ratingSystem = async (req, res) => {
  const vendorId = req.params.vendorId;
  const userId = req.body.userId;
  const rating = req.body.rating;
  const comment = req.body.comment;

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    const existingRating = vendor.scoring.find(
      (rating) => rating.userId === userId
    );
    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment;
    } else {
      vendor.scoring.push({ userId, rating, comment });
    }
    await vendor.save();
    res.json({ message: "Rating and comment updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVendorRating = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      res.status(404).json({ error: "Vendor not found" });
    }

    const ratings = vendor.scoring;
    res.json({ ratings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  resetPassword,
  forgetPassword,
  loginVendor,
  getAllVendors,
  registerVendor,
  ratingSystem,
};
