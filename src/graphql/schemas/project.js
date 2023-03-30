import Joi from "./joi";

const Title = Joi.string()
  .min(2)
  .max(30)
  .label("Project name");

const Description = Joi.string()
  .min(50)
  .label("Project description");

const Comment = Joi.string()
  .min(50)
  .label("Project comment");
  
const Technologies = Joi.string()
  .min(50)
  .label("Project technologies");

const Status = Joi.string()
  .required()
  .max(20)
  .label("Project status");

const id = Joi.string()
  .objectId()
  .label("Object ID");

const Manger = Joi.string()
  .objectId()
  .label("Manger ID");

const CreatedBy = Joi.string()
  .objectId()
  .label("Created by");
  
const UpdatedBy = Joi.string()
  .objectId()
  .label("Updated by");

const Organization = Joi.string()
  .objectId()
  .label("Organization");

export const createProject = Joi.object().keys({
  Title,
  Description,
  Comment,
  Technologies,
  Status,
  Organization,
  CreatedBy,
  UpdatedBy
});

export const updateProject = Joi.object().keys({
  id,
  Title,
  Description,
  Comment,
  Technologies,
  Status,
  Organization,
  CreatedBy,
  UpdatedBy
});
