const { ApolloError } = require("apollo-server");
const { Role, Organization ,User } = require("../../../models");
import { createRole, updateRole, deleteRole, objectId ,} from "../../schemas";
import Joi from "joi";
import { UserInputError } from "apollo-server";
const { ObjectId } = require("mongoose").Types;

const roleMutationResolvers = {
  CreateRole: async (parent, args, context, info) => {
    if (!context.user) {
      throw new Error("You must be logged in to create a role");
    }
    if (context.user.role !== "Super Admin") {
      throw new Error("You are not authorized to create a role");
    }
    // Validation with Joi
    await Joi.validate(args, createRole, { abortEarly: false })
   

    // Check if role with the same name already exists
    const existingRole = await Role.findOne({ name: args.name });
    if (existingRole) throw new UserInputError("Role with the same name already exists");

    // Create and return the new role
    const newRole = await Role.create(args);
    return newRole;
  },

  UpdateRole: async (parent, args, context, info) => {

    if (!context.user) {
      throw new Error("You must be logged in to create a role");
    }
    if (context.user.role !== "Super Admin") {
      throw new Error("You are not authorized to create a role");
    }
    // Validation with Joi
    const { error, value } = Joi.validate(args, updateRole, {
      abortEarly: false,
    });
    if (error) throw new UserInputError("Failed to update role", { errors: error.details });

    // Check if role with the given ID exists
    const existingRole = await Role.findById(args.id);
    if (!existingRole) throw new UserInputError("Role not found");

    // Check if role with the same name already exists
    if (args.name && args.name !== existingRole.name) {
      const existingRoleName = await Role.findOne({ name: args.name });
      if (existingRoleName) throw new UserInputError("Role with the same name already exists");
    }

    // Update and return the role
    Object.assign(existingRole, args);
    const updatedRole = await existingRole.save();
    return updatedRole;
  },

  DisableRole: async (parent, args, context, info) => {
    const { RoleName, OrganizationId } = args;

    console.log(context.user)
  
    try {
      // Check if the organization exists
      const organization = await Organization.findById(OrganizationId);
      if (!organization) {
        throw new Error('Organization not found');
      }
  
      // Check if the current user has permission to disable roles for the organization
      // if (context.user.Role !== 'System Admin' && organization.CreatedBy !== context.user.id) {
      //   throw new Error('Unauthorized');
      // }
  
      // Check if the role exists
      const role = await Role.findOne({ Name: RoleName });
      if (!role) {
        throw new Error('Role not found');
      }
  
      // Notify users associated with the role and ask if they want to assign a new role
      const users = await User.find({ Role: role._id });
      for (const user of users) {
        const message = `The role ${RoleName} in ${organization.Name} is being disabled. Would you like to be assigned a new role?`;
        await sendMessageToUser(user._id, message);
      }
  
      // Disable the role for the organization
      organization.DisabledRoles.push(role._id);
      const updatedOrganization = await Organization.findByIdAndUpdate(OrganizationId, organization, { new: true });
  
      return updatedOrganization;
    } catch (err) {
      throw new ApolloError(err.message);
    }
  },
  
  EnableRole: async (parent, args, context, info) => {
    const { RoleName, OrganizationId } = args;
  
    try {
      // Check if the organization exists
      const organization = await Organization.findById(OrganizationId);
      if (!organization) {
        throw new Error('Organization not found');
      }
  
      // Check if the current user has permission to enable roles for the organization
      // if (context.user.Role !== 'System Admin' && organization.CreatedBy !== context.user.id) {
      //   throw new Error('Unauthorized');
      // }
  
      // Check if the role exists and is disabled
      const role = await Role.findOne({ Name: RoleName });
      if (!role) {
        throw new Error('Role not found');
      }
      if (!organization.DisabledRoles.includes(role._id)) {
        throw new Error('Role is not disabled for this organization');
      }
  
      // Enable the role for the organization
      organization.DisabledRoles = organization.DisabledRoles.filter((disabledRoleId) => disabledRoleId.toString() !== role._id.toString());
      const updatedOrganization = await Organization.findByIdAndUpdate(OrganizationId, organization, { new: true });
  
      return updatedOrganization;
    } catch (err) {
      throw new ApolloError(err.message);
    }
  } ,

  
};

module.exports = roleMutationResolvers;
