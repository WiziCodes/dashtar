const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const median = require("../calc/median");

const vendorSchema = new mongoose.Schema(
  {
    vendor_name: { type: String, required: true },
    vendor_phone: {
      type: String,
      required: false,
    },
    store_name: {
      type: String,
      required: true,
    },
    store_type: {
      type: String,
      required: true,
      default: null,
      enum: [
        "Supermarket",
        "Butchery",
        "Fruits and Vegetables",
        "Drinks and Liquor",
        "Pastery",
      ],
    },
    scoring: [
      {
        userId: { type: String, required: false },
        rating: { type: Number, required: false },
        comment: { type: String, required: false },
      },
    ],
    //   categories: [
    //     {
    //       type: String,
    //       required: true,
    //       default: null,
    //     },
    //   ],
    store_address: {
      type: String,
      required: true,
    },
    store_coverImg: {
      type: String,
      required: false,
    },
    store_profileImg: {
      type: String,
      required: false,
    },
    auth_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    auth_password: {
      type: String,
      required: false,
      default: bcrypt.hashSync("12335678"),
    },
  },
  {
    timestamps: true,
  }
);

vendorSchema.virtual("averageRating").get(function () {
  const ratings = this.scoring.map((rating) => rating.rating);
  const sum = ratings.reduce((acc, current) => acc + current, 0);
  const count = ratings.length;
  return sum / count;
});

vendorSchema.set("toJSON", { virtuals: true });

const Vendor = mongoose.model("W-Vendor", vendorSchema);

module.exports = Vendor;
