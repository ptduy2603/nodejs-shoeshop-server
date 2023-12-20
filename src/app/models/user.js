const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: { type: String },
    addresses: {
      phoneNumber: String,
      ward: String,
      district: String,
      province: String,
    },
    favourites : {
      type : Array,
      default : [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
