import * as Joi from 'joi'

export const createUserSchema = Joi.object({
    username: Joi.string(),
    full_name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    profile_picture: Joi.string(),
    profile_description: Joi.string()
})