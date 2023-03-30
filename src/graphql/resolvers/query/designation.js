// import { Designation, Organization } from "../../../models";
// import { createDesignation, updateDesignation, deleteDesignation, objectId } from "../../schemas";
// import { ApolloError, UserInputError } from "apollo-server";
// import { validateOrg } from "../../../utils/validateOrg";
// import Joi from "joi";

// const designationQueryResolvers = {
//     Designation: async (parent, args, context, info) => {
//         await Joi.validate(args, objectId);
//         return await Designation.findById(args.id);
//       },
//       Designations: async (parent, args, context, info) => {
      
//         return await Designation.find({});
//       }
//   }
  
//   module.exports = designationQueryResolvers;