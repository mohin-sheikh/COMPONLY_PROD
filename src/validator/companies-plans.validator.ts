import * as Joi from 'joi';

export const register = Joi.object({
  company_id: Joi.number().required(),
  plan_id: Joi.number(),
  status: Joi.string(),
}).options({ abortEarly: false });
