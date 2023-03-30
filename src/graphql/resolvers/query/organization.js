
import { Organization, User } from "../../../models";
import Joi from "joi";
import { attemptSignIn, signOut } from "../../../auth";
import {
  registerOrganization,
  signInOrganization,
  signUp,
  objectId,
  updateOrganization,
} from "../../schemas";
import { ApolloError, UserInputError } from "apollo-server";
import { generateToken } from "../../../utils/generateToken";
import { validateOrg } from "../../../utils/validateOrg";
import { validateImage } from "../../../utils/imageValidate";
const organizationQueryResolvers = {
    // Organizations: async (parent, args, context, info) => {
    //   if (context.user.role !== 'Super Admin') {
    //     throw new Error('Unauthorized to see all organizations');
    //   }
    //     return await Organization.find({});
    //   },


    Organizations: async (parent, args, context, info) => {
      if (context.user.role !== 'Super Admin') {
        throw new Error('Unauthorized to see all organizations');
      }
        return await Organization.find({});
      },
      Organization: async (parent, args, context, info) => {
        if (context.user.role !== 'Super Admin') {
          throw new Error('Unauthorized to get the user');
        }
        await Joi.validate(args, objectId);
        return await Organization.findById(args.id);
      },
  }
  
  module.exports =organizationQueryResolvers;