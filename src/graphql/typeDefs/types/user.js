const { gql } = require("apollo-server");

const userType = gql`
  type UserType {
    id: ID!
    Organization: String!
    FirstName: String!
    LastName: String!
    Email: String
    PhoneNum: String!
    ProfileImage: String!
    createdAt: String
    updatedAt: String
    Role: String!
    AccessToken: String
    isVerfied:Boolean!
  }

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

  type UpdatePasswordResponse {
    success: Boolean!
    message: String!
  }

  type PasswordChangedResponse {
    success: Boolean!
    message: String!
  }

  type EmailVerfiedResponse {

    success: Boolean!
    message: String!
  }
`;

module.exports = {
  userType,
};
