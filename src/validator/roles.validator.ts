import * as Joi from 'joi';

export const register = Joi.object({
  title: Joi.string().required().min(3).max(35).required(),
  description: Joi.string().required(),
  permission: Joi.string()
    .required()
    .valid(...['admin', 'guest', 'restricted member', 'editor']),
}).options({ abortEarly: false });
