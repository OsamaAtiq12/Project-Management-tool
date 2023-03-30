import { Organization, User, Role } from "../../../models";
import Joi from "joi";
const nodemailer = require("nodemailer");
import { generateOTP } from "../../../utils/generateOtp";
var mongoose = require("mongoose");
import { attemptSignIn, signOut } from "../../../auth";
import {
  registerOrganization,
  signInOrganization,
  signUp,
  objectId,
  signUporg,
  updateOrganization,
} from "../../schemas";
import { ApolloError, UserInputError } from "apollo-server";
import { generateToken } from "../../../utils/generateToken";
import { validateOrg } from "../../../utils/validateOrg";
import { validateImage } from "../../../utils/imageValidate";
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
const organizationMutationResolvers = {
  RegisterOrganization: async (parent, args, { req }, info) => {
    var organizationargs = {
      OrganizationName: args.OrganizationName,
      OrganizationDomain: args.OrganizationDomain,
      OrganizationDescription: args.OrganizationDescription,
      Logo: "Test.png",
    };

    await Joi.validate(organizationargs, registerOrganization, {
      abortEarly: false,
    });

    validateImage(args.Logo);

    const roles = await Role.find();
    const MyRoles = roles
  .filter(role => role.name !== "Super Admin") // exclude role with name "super Admin"
  .map(role => {
    return { Rolename: role.name }
  });


    
    organizationargs.Roles = MyRoles;

    const organization = await Organization.create(organizationargs);

   
    const orgAdminRole = organization.Roles.find(role => role.Rolename === "Organization Admin");

    if (!orgAdminRole) {
      // If the role does not exist, throw an error
      throw new Error("Organization Admin role not found in organization");
    }

    else{
      const VerificationCode = generateOTP();
      const userargs = {
        Email: args.Email,
        Password: args.Password,
        FirstName: args.FirstName,
        LastName: args.LastName,
        Organization: args.OrganizationName,
        PhoneNum: args.PhoneNum,
        ProfileImage: args.ProfileImage,
        Role: "Organization Admin",
        EmailVerificationCode: VerificationCode,
      };
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: args.Email,
        subject: "Verify Your Account",
        html: `Hello ${userargs.FirstName},<br/><br/>Your Email Verification Code is <br/><a>${VerificationCode}</a>`,
      });


        await Joi.validate(userargs, signUporg, {
        abortEarly: false,
      });

      validateImage(args.ProfileImage);
      if(organization){
        const user = await User.create(userargs);
        return { organization, user };
      }
      else{
       
        await Organization.deleteOne({ _id: organization._id.toString() });
      }
     
      
    }
    
  },

  UpdateOrganization: async (parent, args, context, info) => {
    console.log(context.user.role);
    // Check if user is authenticated
    if (!context.user) {
      throw new Error("You must be logged in to update a user's organization");
    }
    const validUserTypes = ["Organization Admin", "Super Admin"];
    // Validate user type

    if (validUserTypes.includes(context.user.role.toString())) {
      if (context.user.role === "Organization Admin") {
        if (context.user.organization !== args.id) {
          throw new Error("You are not authorized to update this organization");
        }
      } else if (context.user.role !== "Super Admin") {
        throw new Error("You are not authorized to update any organization");
      }

      // Validate organization data
      await Joi.validate(args, updateOrganization, { abortEarly: false });
      let message = "";
      const organizationFound = await Organization.findOne({ _id: args.id });
      if (organizationFound) {
        if (organizationFound.Email && organizationFound.Email === args.Email) {
          message = "Email already taken";
        } else if (
          args.OrganizationName &&
          organizationFound.OrganizationName === args.OrganizationName
        ) {
          message = "Organization name already taken";
        } else if (
          args.OrganizationDomain &&
          organizationFound.OrganizationDomain === args.OrganizationDomain
        ) {
          message = "Organization domain already taken";
        } else {
          message = "";
        }
      }
      if (message) {
        throw new UserInputError(message);
      }

      // Update organization
      const organization = await Organization.findByIdAndUpdate(
        { _id: args.id },
        { ...args },
        { new: true }
      );
      return organization;
    } else {
      throw new Error("You are not authorized to update a user's organization");
    }
  },

  deleteOrganization: async (parent, args, context, info) => {
    // Check if user is authenticated
    if (!context.user) {
      throw new Error("You must be logged in to delete an organization");
    }

    // Check if user is Super Admin
    if (context.user.role !== "Super Admin") {
      throw new Error("You are not authorized to delete an organization");
    }

    // Find the organization to be deleted
    const organization = await Organization.findById(args.OrganizationId);

    if (!organization) {
      throw new Error("Organization not found");
    }

    const roleName = "Organization Admin";

    // Find the role by name
    const role = await Role.findOne({ name: roleName });

    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
    // Find the organization admin to be deleted
    const organizationAdmin = await User.findOne({
      organization: args.OrganizationId,
      role: role._id,
    });

    if (!organizationAdmin) {
      throw new Error("Organization Admin not found");
    }

    // Find all users of the organization to be deleted
    const users = await User.find({ Organization: args.id });

    // Start a session for the transaction

    try {
      // Delete the organization, its admin, and all its users
      await organization.remove();
      await organizationAdmin.remove();
      await User.deleteMany({ organization: args.id });

      return {
        message: "Organization and associated data deleted successfully",
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};

module.exports = organizationMutationResolvers;
