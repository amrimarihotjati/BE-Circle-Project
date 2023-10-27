import * as Joi from "joi";

export const ReplySchemaValidation = Joi.object({
  user_id: Joi.number().required(),
  thread_id: Joi.number().required(),
  // image: Joi.string(),
  content: Joi.string(),
});

export const ReplyUpdateValidation = Joi.object({
  image: Joi.string(),
  content: Joi.string(),
});
