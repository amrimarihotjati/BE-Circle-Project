import * as Joi from "joi";

export const ReplySchemaValidation = Joi.object({
  image: Joi.string().allow(null, ""),
  content: Joi.string(),
});

export const ReplyUpdateValidation = Joi.object({
  image: Joi.string(),
  content: Joi.string(),
});
