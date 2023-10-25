import * as Joi from 'joi'

export const createThreadSchema = Joi.object({
    content: Joi.string().required(),
    image: Joi.string(),
    user: Joi.number(),
    posted_at: Joi.date()
})