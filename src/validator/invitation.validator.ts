import * as Joi from 'joi';

export const register = Joi.object({
  admin_id: Joi.number().required(),
  role_id: Joi.number().required(),
  company_id: Joi.number().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'in', 'io'] },
  }),
}).options({ abortEarly: false });
