import * as Joi from 'joi';

export const register = Joi.object({
  name: Joi.string().lowercase().min(3).max(40).required(),
  logo: Joi.string(),
  seats: Joi.number(),
}).options({ abortEarly: false });
