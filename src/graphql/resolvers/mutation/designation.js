// import { Designation, Organization } from "../../../models";
// import { createDesignation, updateDesignation, deleteDesignation, objectId } from "../../schemas";
// import { ApolloError, UserInputError } from "apollo-server";
// import { validateOrg } from "../../../utils/validateOrg";
// import Joi from "joi";

// const designationMutationResolvers = {
//     CreateDesignation: async (parent, args, context, info) => {
//          console.log(args)
//         if (!validateOrg(context)) {
//           throw new ApolloError("You are not allowed to create designation")
//         }
//         await Joi.validate(args, createDesignation);
//         const designation = await Designation.create({...args,Organization:context.user.id});
//         return designation;
//       },
//       UpdateDesignation: async (parent, args, context, info) => {
//         const designation = await Designation.findOne({ _id: args.id })
//         if (!designation) {
//           throw new ApolloError("Designation not found!")
//         }
//         if (validateOrg(context) === false || !context.user.id === designation.Organization.toString()) {
//           throw new ApolloError("You are not allowed to update this designation")
//         }
  
//         const { Name, Description, BaseSalary } = args;
//         await Joi.validate(args, updateDesignation);
  
//         const updatedDesignation = await Designation.findOneAndUpdate(
//           { _id: args.id},
//           {
//             Name,
//             Description,
//             BaseSalary
//           },
//           { new: true }
//         );
//         return updatedDesignation;
//       },
  
//       DeleteDesignation: async (parent, args, context, info) => {
//         await Joi.validate(args, deleteDesignation, { abortEarly: false });
//         const desg = await Designation.findOne({ _id: args.id})
//         if (!desg) {
//           throw new ApolloError("Designation dose not exist!")
//         }
//         if (validateOrg(context) === false || desg.Organization.toString() !== context.user.id) {
//           throw new ApolloError("You are not allowed to delete this designation")
//         }
//         const user = await Designation.findByIdAndDelete(args.id);
//         return user
//       },
//   }
  
//   module.exports = designationMutationResolvers;