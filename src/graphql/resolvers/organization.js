
const organizationQueryResolvers =require('./query/organization')
const organizationMutationResolvers =require('./mutation/organization')
export default {
  Query: {
   ...organizationQueryResolvers
  },
  Mutation: {
 ...organizationMutationResolvers
  },
  // OrganizationType: {
  //     AccessToken: async (organization, args, context, info) => {
  //         organization.type = "org";
  //         const token = generateToken(organization)
  //         return token;
  //     }
  // }
};
