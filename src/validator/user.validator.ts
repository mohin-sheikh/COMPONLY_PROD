import * as Joi from 'joi';

export const registerUserSchema = Joi.object({
  first_name: Joi.string().lowercase().min(3).max(35).required(),
  last_name: Joi.string().lowercase().min(3).max(35).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'in', 'io'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirmPass: Joi.ref('password'),
  profile: Joi.string(),
  stripe_customer_id: Joi.string(),
  stripe_card_id: Joi.string(),
  company_id: Joi.number(),
  invitation_id: Joi.number(),
}).options({ abortEarly: false });

export const login2FA = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'in', 'io'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const forgotPass = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'in', 'io'] },
    })
    .required(),
});

export const forgotPassVerify = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'in', 'io'] },
    })
    .required(),
  otp: Joi.string().required(),
  newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirmPassword: Joi.ref('newPassword'),
});

export const updateUserSchema = Joi.object({
  first_name: Joi.string().lowercase().min(3).max(30).allow(''),
  last_name: Joi.string().lowercase().min(3).max(30).allow(''),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'in', 'io'] },
    })
    .allow(''),
  alternate_email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'in', 'io'] },
    })
    .allow(''),
  profile: Joi.string().allow(''),
}).options({ abortEarly: false });

export const resetPass = Joi.object({
  currentPass: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  newPass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmPass: Joi.ref('newPass'),
}).options({ abortEarly: false });
