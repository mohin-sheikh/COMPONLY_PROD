"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPass = exports.updateUserSchema = exports.forgotPassVerify = exports.forgotPass = exports.login2FA = exports.registerUserSchema = void 0;
const Joi = require("joi");
exports.registerUserSchema = Joi.object({
    full_name: Joi.string().lowercase().min(3).max(35).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'in', 'io'] },
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPass: Joi.ref('password'),
    profile: Joi.string(),
    stripe_card_id: Joi.string(),
}).options({ abortEarly: false });
exports.login2FA = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'in', 'io'] },
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
exports.forgotPass = Joi.object({
    email: Joi.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'in', 'io'] },
    })
        .required(),
});
exports.forgotPassVerify = Joi.object({
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
exports.updateUserSchema = Joi.object({
    full_name: Joi.string().lowercase().min(3).max(30).allow(''),
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
exports.resetPass = Joi.object({
    currentPass: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    newPass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPass: Joi.ref('newPass'),
}).options({ abortEarly: false });
//# sourceMappingURL=user.validator.js.map