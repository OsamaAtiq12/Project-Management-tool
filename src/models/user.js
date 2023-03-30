import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";
import Role from "./role";

import { generateOTP } from "../utils/generateOtp";
const userSchema = new mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    PhoneNum: String,
    ProfileImage: String,
    Organization: String,
    Password: String,

    EmailVerificationCode: {
      type: String,
      default: "",
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: String,
      validate: {
        validator: (Email) => User.doesntExist({ Email }),
        message: ({ val: Email }) => `Email has already been taken.`,
      },
    },
    Role: {
      type: String,
      ref: "Role",
    },
    OtpCode: {
      type: String,
      default: "",
    },
    OtpCodeExpiry: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("Password")) {
    this.Password = await hash(this.Password, 10);
  }
});

userSchema.statics.doesntExist = async function (option) {
  return (await this.where(option).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function (Password) {
  return compare(Password, this.Password);
};

userSchema.methods.generateOtp = function () {
  const otpCode = generateOTP(); // Generate OTP code using your OTP generation logic.
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // Set the OTP expiry to 10 minutes from now.
  this.OtpCode = otpCode;
  this.OtpCodeExpiry = expiry;
  return otpCode;
};

const User = mongoose.model("User", userSchema);

export default User;
