
const jwt = require('jsonwebtoken');

import { generateToken } from "../../utils/generateToken";


const userQueryResolvers  =require('./query/user')
const userMutationResolvers  =require('./mutation/user')
export default {


  Query: {
  ...userQueryResolvers
  },
  Mutation: {
    ...userMutationResolvers
  },
  UserType: {
    // Designation: async (user, args, context, info) => {
    //   await user.populate("Designation");
    //   return user.Designation;
    // },
    Organization: async (user, args, context, info) => {
      await user.populate("Organization");
      return user.Organization;
    },
    AccessToken: async (user, args, context, info) => {
      
      // user.Role="Organization User";
      const token = generateToken(user);
      return token;
    },
  },
};
