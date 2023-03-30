const { gql } = require("apollo-server");

const userType = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    organization: String!
    token: String
    
  },

  type ForgotPasswordResponse {
    success: Boolean!
    token: String
  }

  type ResetPasswordResponse {
    success: Boolean!
    token: String
  }

  type UpdateProfileResponse {
    success: Boolean!
    message: String!
  }

  type DeleteUserResponse {
    success: Boolean!
    message: String!
  }
`

module.exports = {
  userType
};
