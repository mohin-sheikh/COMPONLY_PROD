"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Joi = require("joi");
exports.register = Joi.object({
    admin_id: Joi.number().required(),
    role_id: Joi.number().required(),
    company_id: Joi.number().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'in', 'io'] },
    }),
}).options({ abortEarly: false });
//# sourceMappingURL=invitation.validator.js.map