import Joi from "./joi";
const name = Joi.string()
  .min(5)
  .max(200)
  .label("name");

const id = Joi.string()
  .objectId()
  .label("ID");


export const updateRole = Joi.object().keys({
  id,
  name,
});

export const createRole = Joi.object().keys({
name,
});

export const deleteRole = Joi.object().keys({
  id
});
