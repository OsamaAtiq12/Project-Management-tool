import Joi from "./joi";

const Email = Joi.string()
  .email()
  // .required()
  .label("Email");

const Password = Joi.string()
  //password has to be at least one lower case, one uppercase, one number, one special character and between 8 to 30 characters long
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/)
  .label("Password")
  .options({
    language: {
      string: {
        regex: {
          base:
            "Password must contains at least one lowercase letter, one uppercase letter, one number, one special character and between 8 to 30 characters long."
        }
      }
    }
  });
const FirstName = Joi.string()
  .min(1)
  .max(20)
  .label("FirstName");
const LastName = Joi.string()
  .min(1)
  .max(20)
  .label("LastName");

const PhoneNum = Joi.string()
  .label("Phone number")
  .min(10)
  .max(15);

const OrganizationName = Joi.string()
  .min(1)
  .max(20)
  .label("OrganizationName");
const OrganizationDomain = Joi.string()
  .regex(/^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/)
  .min(1)
  .max(63)
  .label("OrganizationDomain");

const OrganizationDescription = Joi.string()
  .min(100)
  .label("OrganizationDescription");

const id = Joi.string().objectId();
const Logo = Joi.string().label("Logo");

export const updateOrganization = Joi.object().keys({
  id,
  OrganizationName,
  OrganizationDomain,
  OrganizationDescription,
});

export const registerOrganization = Joi.object().keys({
  
  OrganizationName,
  OrganizationDomain,
  OrganizationDescription,
  Logo
});

export const signInOrganization = Joi.object().keys({
  Email,
  Password
});
