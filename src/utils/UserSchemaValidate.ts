import * as Joi from "joi";

export const UserSchemaValidate = Joi.object({
  username: Joi.string().min(5).required(),
  full_name: Joi.string().min(5).required(),
  email: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
});

export const UserSchemaUpdate = Joi.object({
  username: Joi.string().allow(''),
  full_name: Joi.string().allow(''),
  email: Joi.string().allow(''),
  password: Joi.string().allow(''),
  bio: Joi.string().allow(''),
  photo_profile: Joi.string().allow('')
});

export const UserSchemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});