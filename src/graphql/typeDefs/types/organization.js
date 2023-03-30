const { gql } = require('apollo-server');


const organizationType = gql`
  type OrganizationType {
    id: ID!
    FirstName: String!
    LastName: String!
    Email: String
    PhoneNum: String!
    ProfileImage:String!
    Roles: [RoletypesGlobal!]!
    OrganizationName:String!
    OrganizationDomain:String!
    OrganizationDescription:String!
    Logo:String
    createdAt: String
    updatedAt: String
    
  }
  type RegisterOrganizationPayload {
    organization: OrganizationType!
    user: UserType!
  }

  type SuccessFullyDeletedOrganization{
    success: Boolean!
    message: String!
  }
  
`;

module.exports = { organizationType }