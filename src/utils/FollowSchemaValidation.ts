import * as Joi from 'joi'

export const FollowSchemaValidation = Joi.object({
    following_id: Joi.number().required(),
    follower_id: Joi.number().required(),
})