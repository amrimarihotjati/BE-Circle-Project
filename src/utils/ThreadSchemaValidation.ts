import * as Joi from "joi";

export const ThreadSchemaValidate = Joi.object({
  content: Joi.string().required(),
  image: Joi.string().allow(null, ""),
  created_by: Joi.number().required(),
});

export const UpdateThreadValidate = Joi.object({
  content: Joi.string(),
  image: Joi.string(),
});
