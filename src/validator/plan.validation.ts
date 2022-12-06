import * as Joi from 'joi';

export const register = Joi.object({
  title: Joi.string(),
  subtitle: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  period: Joi.string()
    .lowercase()
    .valid(...['null', 'month', 'year']),
  features: Joi.string(),
}).options({ abortEarly: false });
