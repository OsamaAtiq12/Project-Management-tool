import Joi from "./joi";

const Email = Joi.string().email().required().label("Email");

const Password = Joi.string()
  //password has to be at least one lower case, one uppercase, one number, one special character and between 8 to 30 characters long
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/)
  .label("Password")
  .options({
    language: {
      string: {
        regex: {
          base: "Password must contains at least one lowercase letter, one uppercase letter, one number, one special character and between 8 to 30 characters long.",
        },
      },
    },
  });
const FirstName = Joi.string().min(1).max(20).label("FirstName");
const LastName = Joi.string().min(1).max(20).label("LastName");

const ProfileImage = Joi.string().label("Profile Image");

const Role = Joi.string().required().label("User Role");

const Designation = Joi.string().objectId();
const Organization = Joi.string().required().label("Organization");

const PhoneNum = Joi.string().label("Phone number").min(10).max(15);

const id = Joi.string().objectId();

export const updateUser = Joi.object().keys({
  id,
  FirstName,
  LastName,
  Organization,
  PhoneNum,
  Email,
  ProfileImage,

});

export const signUp = Joi.object().keys({
  Email,
  Password,
  FirstName,
  LastName,
  Organization,
  PhoneNum,
  ProfileImage,
 
  AccessToken: Joi.string().label("Access Token"),
});

export const signIn = Joi.object().keys({
  Email,
  Password,
  AccessToken: Joi.string().label("Access Token"),
});
export const deleteUser = Joi.object().keys({
  id,
});


export const signUporg = Joi.object().keys({
  Email,
  Password,
  FirstName,
  LastName,
  Organization,
  PhoneNum,
  ProfileImage,
  Role,
  AccessToken: Joi.string().label("Access Token"),
  EmailVerificationCode:Joi.string()
});


export const adduser = Joi.object().keys({
  Email,
  Password,
  FirstName,
  LastName,

  PhoneNum,
  ProfileImage,
 
  AccessToken: Joi.string().label("Access Token"),
});


const Passwords = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const changePassword = Joi.string().regex(Passwords).required();