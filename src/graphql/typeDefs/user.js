const { gql } = require('apollo-server');

import { GraphQLEnumType } from "graphql"

export default gql`

  enum Role{
    OrganizationUser
  }

  extend type Query {
    User(id: ID!): UserType @auth
    Users: [UserType!]! @auth
    UserEmails: [UserType!]!
  }

  input UserFilter {
    _id: String
    email: String
    organization: String
  }
  
  extend type Mutation {
    SignUp(
      FirstName: String!
      LastName: String!
      Password: String!
      Email: String!
      Organization: String!
      PhoneNum: String!
      ProfileImage: String!
      AccessToken: String
    ): UserType @guest

    EmailVerification(
      email: String!
      Code: String!
    ):EmailVerfiedResponse!
    AddUser(
      FirstName: String!
      LastName: String!
      Password: String!
      Email: String!
      PhoneNum: String!
      ProfileImage: String!
      AccessToken: String
    ): UserType @guest

  

    SignIn(Email: String!, Password: String!): UserType @guest
    SignOut: Boolean @auth
    UpdateUser(
      id: ID!
      FirstName: String!
      LastName: String!
      Email: String!
      Organization: ID!
      PhoneNum: String!
      ProfileImage:String!
      
    ): UserType @auth

    DeleteUser(
      id: ID!
    ): UserType @auth


    changePassword(Password: String!, email: String!):PasswordChangedResponse!

    forgotPassword(email: String!): ForgotPasswordResponse!

    resetPassword(Email: String!, Otp: String!): ResetPasswordResponse!

    updatePassword(oldPassword: String!, newPassword: String!):UpdatePasswordResponse!
  }

`;
