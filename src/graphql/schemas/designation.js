import Joi from "./joi";

const BaseSalary = Joi.number()
  .integer()
  .min(0)
  .max(999999)
  .label("base salary")
  .error(new Error("Base salary must be an integer value between 0-999,999"));

const Name = Joi.string()
  .min(5)
  .max(200)
  .label("name");

const Description = Joi.string()
  .min(50)
  .label("description");

const id = Joi.string()
  .objectId()
  .label("ID");
const Organization = Joi.string().objectId();

export const updateDesignation = Joi.object().keys({
  id,
  Name,
  BaseSalary,
  Description,
});

export const createDesignation = Joi.object().keys({
  Name,
  BaseSalary,
  Description,
});

export const deleteDesignation = Joi.object().keys({
  id
});
