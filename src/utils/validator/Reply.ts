import * as Joi from 'joi'

export const createReplySchema = Joi.object({
    reply: Joi.string().required(),
    user: Joi.number()
})