const { ApolloServer, gql } = require("apollo-server");

export default gql`
  extend type Query {
    Organizations: [OrganizationType] @auth
    Organization(id: ID!): OrganizationType @auth
  }
  extend type Mutation {
    RegisterOrganization(
      FirstName: String!
      LastName: String!
      Password: String!
      Email: String!
      PhoneNum: String!
      ProfileImage: String!
      Role: Role
      OrganizationName: String!
      OrganizationDomain: String!
      OrganizationDescription: String!
      Logo: String!
      createdAt: String
      updatedAt: String
    ):RegisterOrganizationPayload!
 
    deleteOrganization(OrganizationId: ID!):SuccessFullyDeletedOrganization
    
    DisableRole(OrganizationId: ID!, RoleName: String!): OrganizationType @auth
    EnableRole(OrganizationId: ID!, RoleName: String!): OrganizationType @auth
    DisableRoleSA(RoleName: String!): OrganizationType @auth
    SignInOrganization(Email: String!, Password: String!): OrganizationType
      @guest
    SignOutOrganization: Boolean @auth
    UpdateOrganization(
      id: ID!
      OrganizationName: String!
      OrganizationDomain: String!
      OrganizationDescription: String!
      Logo: String
      createdAt: String
      updatedAt: String
    ): OrganizationType @auth
  }
`;
