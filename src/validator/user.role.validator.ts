import * as Joi from 'joi';

export const register = Joi.object({
  user_id: Joi.number().required(),
  role_id: Joi.number().required(),
  company_id: Joi.number().required(),
}).options({ abortEarly: false });
