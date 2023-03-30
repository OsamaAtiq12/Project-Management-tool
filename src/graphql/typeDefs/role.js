const { ApolloServer, gql } = require("apollo-server");
import { GraphQLEnumType } from "graphql";

export default gql`
  extend type Query {
    Role(id: ID!): Roletypes
    Roles: [Roletypes!]! 
    RoleUserCount(OrganizationName: String!, RoleName: String!):OtherRoles!
    GlobalRoleUserCount(RoleName: String!):OtherRole!
  
  }
  extend type Mutation {
    CreateRole(
        name:String!
    ): Roletypes
    UpdateRole(
      id: ID!
       name:String!
    ): Roletypes

    DeleteRole(
      id:ID!
    ): Roletypes

    
  }
`;
