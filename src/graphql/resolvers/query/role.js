import { Role, User, Organization } from "../../../models";
import { objectId } from "../../schemas";
const { ObjectId } = require("mongodb");
import Joi from "joi";
const roleQueryResolvers = {
  Role: async (parent, args, context, info) => {
    await Joi.validate(args, objectId);
    return await Role.findById(args.id);
  },
  Roles: async (parent, args, context, info) => {
    const role = await Role.find();
    return role;
  },

  RoleUserCount: async (parent, args, context, info) => {
    if (!context.user) {
      throw new Error(
        "Please login in order to Count The Users With Associated Roles"
      );
    }
    const { RoleName, OrganizationName } = args;

    const orgName = OrganizationName;
    const organization = await Organization.findOne({
      OrganizationName: orgName,
    });

    // Check that the requesting user is authorized to access this information
    // This would involve checking the requesting user's role against the role that they are querying for
    // I'll assume this authorization check is done using the @auth directive
    const roleId = await Role.findOne({ name: RoleName }).select("_id").lean();

    // Fetch the count of users with the given role within the organization

    
    // Fetch the other roles in the organization
    if (context.user.role === "Organization Admin") {
      const count = await User.countDocuments({
        Role: RoleName,
        Organization: organization.OrganizationName,
      });

      if (RoleName === "Organization Admin") {
        throw new Error("You are not authorized to Disable this role");
      }

      const MyRoles = organization.Roles.filter(
        (role) => role.Rolename !== RoleName
      );

      const enabledRoles = MyRoles.filter((role) => role.isDisabled === false);

     const otherRole= enabledRoles

      return {
        count,
        otherRole,
      };
    }

    else{

      throw new Error("You are not Authenticated")
    }
  },




  GlobalRoleUserCount: async (parent, args, context, info) => {
    if (!context.user) {
      throw new Error(
        "Please login in order to Count The Users With Associated Roles"
      );
    }
    const { RoleName } = args;

    

    // Check that the requesting user is authorized to access this information
    // This would involve checking the requesting user's role against the role that they are querying for
    // I'll assume this authorization check is done using the @auth directive
    const roleId = await Role.findOne({ name: RoleName }).select("_id").lean();
 
    // Fetch the count of users with the given role within the organization

    if (context.user.role === "Super Admin") {
      const count = await User.countDocuments({
        Role: RoleName,
      });
      const otherRoles = await Role.find({
        _id: { $ne: roleId },
        // Exclude the Super Admin role
      })
      
      const enabledRoles =  otherRoles.filter((role) => role.isDisabled === false);

      const otherRole= enabledRoles
      return {
        count,
        otherRole
      };
    }
    
    else{
      throw new Error("Make Sure You are Authenticated");
    }
   
  },


};

module.exports = roleQueryResolvers;
