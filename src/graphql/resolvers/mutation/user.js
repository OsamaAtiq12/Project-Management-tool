import { ApolloError, UserInputError } from "apollo-server";
import { generateToken } from "../../../utils/generateToken";
import { generateOTP } from "../../../utils/generateOtp";
var mongoose = require("mongoose");
import { changePassword } from "../../schemas";
import bcrypt from "bcrypt";
require("dotenv").config();
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const nodemailer = require("nodemailer");
const { User, Organization, Role } = require("../../../models");
import { validateOrg } from "../../../utils/validateOrg";
import { attemptSignIn, signOut } from "../../../auth";
import {
  signUp,
  signIn,
  objectId,
  updateUser,
  deleteUser,
  adduser,
} from "../../schemas";
import { validateImage } from "../../../utils/imageValidate";
import config from "../../../config";
import Joi from "joi";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const userMutationResolvers = {
  SignUp: async (parent, args, { req }, info) => {
    await Joi.validate(args, signUp, { abortEarly: false });

    // get the ObjectId of the role with the matching name

    // get the ObjectId of the organization with the matching name
    const organization = await Organization.findOne({
      OrganizationName: args.Organization,
    });
    if (!organization) {
      throw new UserInputError(`Organization ${args.Organization} not found`);
    }

    const orgAdminRole = organization.Roles.find(
      (role) => role.Rolename === "Organization User"
    );

    if (orgAdminRole) {
      // generate OTP code

      if (orgAdminRole.isDisabled === true) {
        throw new Error("This role is disabled for this organization");
      }
      const VerificationCode = generateOTP();

      // create the user document using the role and organization ObjectId
      const user = await User.create({
        FirstName: args.FirstName,
        LastName: args.LastName,
        Password: args.Password,
        Email: args.Email,
        Organization: args.Organization,
        PhoneNum: args.PhoneNum,
        ProfileImage: "Test.png",
        Role: "Organization User",
        EmailVerificationCode: VerificationCode,
        AccessToken: args.AccessToken,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: args.Email,
        subject: "Verify Your Account",
        html: `Hello ${user.FirstName},<br/><br/>Your Email Verification Code is <br/><a>${VerificationCode}</a>`,
      });

      const token = (req.session.userId = user.id);
      return user;
    }
  },

  EmailVerification: async (parent, args, context, info) => {
    console.log(args);
    const user = await User.findOne({ Email: args.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerfied) {
      throw new Error("Email already verified");
    }

    if (user.EmailVerificationCode !== args.Code) {
      throw new Error("Invalid verification code");
    }

    // Update the user document
    const result = await User.updateOne(
      { _id: user._id },
      { $set: { isVerfied: true, EmailVerificationCode: null } }
    );

    if (result.modifiedCount !== 1) {
      throw new Error("Failed to update user document");
    }

    return { success: true };
  },
  SignIn: async (parent, args, { req }, info) => {
    console.log(args);
    await Joi.validate(args, signIn, { abortEarly: false });
    const user = await attemptSignIn(args.Email, args.Password);
    if (user.isVerfied === false) {
      throw new Error("Please Verify your account");
    }
    return user;
  },

  SignOut: (parent, args, { req, res }, info) => {
    return signOut(req, res);
  },

  UpdateUser: async (parent, args, { user, res }, info) => {
    await Joi.validate(args, updateUser, { abortEarly: false });
    const existingUser = await User.findOne({
      FirstName: args.FirstName,
    }).lean();
    if (existingUser && existingUser._id !== args.id) {
      throw new UserInputError("Username has been taken.");
    }

    // const DesignationFound = await Designation.findOne({
    //   _id: args.Designation,
    // });
    // if (!DesignationFound) {
    //   throw new UserInputError(
    //     "Please select from the available designation list."
    //   );
    // }

    const updatedUser = await User.findOneAndUpdate({ _id: args.id }, args, {
      new: true, // Return the updated document
      lean: true, // Return a plain JavaScript object
    });

    return updatedUser;
  },

  DeleteUser: async (parent, args, context, info) => {
    await Joi.validate(args, deleteUser, { abortEarly: false });
    const emp = await User.findOne({ _id: args.id });
    if (!emp) {
      throw new ApolloError("User dose not exist!");
    }
    // if (
    //   validateOrg(context) === false ||
    //   emp.Organization.toString() !== context.user.id
    // ) {
    //   throw new ApolloError("You are not allowed to delete this account");
    // }
    const user = await User.findByIdAndDelete(args.id);
    return user;
  },

  forgotPassword: async (parent, args, context, info) => {
    const user = await User.findOne({ Email: args.email });
    console.log(user);
    if (user) {
      const otpCode = user.generateOtp();
      const otpCodeExpiry = Date.now() + 10 * 60 * 1000;

      // Update the user document with new OTP and expiration time
      const myuser = await User.updateOne(
        { _id: user._id },
        { $set: { OtpCode: otpCode, OtpCodeExpiry: otpCodeExpiry } }
      );

      const mailOptions = {
        from: "osamaatiq42@gmail.com",
        to: args.email,
        subject: "Password reset OTP",
        text: `Your OTP is ${otpCode}. It is valid for 10 minutes.`,
      };
      await transporter.sendMail(mailOptions);

      const token = jwt.sign({ email: user.Email }, config.JWT_SECRET);
      return { success: true };
    } else {
      return { success: false };
    }
  },

  resetPassword: async (parent, args, context, info) => {
    console.log(args);

    const user = await User.findOne({ Email: args.Email });

    if (user == null) {
      throw new Error("User not found");
    } else {
      if (user.OtpCode === args.Otp) {
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              OtpCode: null,
            },
          }
        );

        return { success: true };
      } else {
        throw new Error("Otp Does Not Match Or the Opt Code is Expired");
      }
    }
  },

  changePassword: async function (parent, args, context, info) {
    await Joi.validate(args.Password, changePassword, { abortEarly: false });

    const user = await User.findOne({ Email: args.email });
    if (!user) {
      throw new Error("User not found");
    } else {
      const newPassword = await hash(args.Password, 10);
      await User.updateOne(
        { _id: user.id },
        { $set: { Password: newPassword } }
      );

      return { success: true };
    }
  },

  updatePassword: async (parent, args, context, info) => {
    const { user } = context;

    if (!user) {
      throw new AuthenticationError(
        "You must be logged in to view this information"
      );
    }
    try {
      const userProfile = await User.findOne({ _id: Types.ObjectId(user.id) });

      const isMatch = await comparePassword(
        args.oldPassword,
        userProfile.Password
      );

      if (isMatch) {
        const newPassword = await encryptPassword(args.newPassword);
        await User.updateOne(
          { _id: new mongoose.Types.ObjectId(user.id) },
          { $set: { password: newPassword } }
        );
        return { success: true, message: "Password Updated Successfully!" };
      } else {
        throw new AuthenticationError("Wrong Password!");
      }
    } catch (err) {
      throw new Error("Error updating password");
    }
  },

  AddUser: async (parent, args, context, info) => {
    if (context.user == null) {
      throw new Error("Please Login to Create a new user");
    }
    if (context.user.role !== "Organization Admin") {
      throw new Error("You are not authorized to delete an organization");
    }
    await Joi.validate(args, adduser, { abortEarly: false });

    // get the ObjectId of the role with the matching name
    const role = await Role.findOne({ name: "Organization User" }); // set the default role to "Organization admin"
    if (!role) {
      throw new UserInputError(`Role "Organization admin" not found`);
    }

    const VerificationCode = generateOTP();

    // get the ObjectId of the organization with the matching name

    // create the user document using the role and organization ObjectId
    const user = await User.create({
      FirstName: args.FirstName,
      LastName: args.LastName,
      Password: args.Password,
      Email: args.Email,
      Organization: context.user.organization, // store the ObjectId of the organization
      PhoneNum: args.PhoneNum,
      ProfileImage: "Test.png",
      Role: role.name, // store the ObjectId of the role
      AccessToken: args.AccessToken,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: args.Email,
      subject: "Verify Your Account",
      html: `Hello ${user.FirstName},<br/><br/>Your Email Verification Code is <br/><a>${VerificationCode}</a>`,
    });

    return user;
  },
};

module.exports = userMutationResolvers;
