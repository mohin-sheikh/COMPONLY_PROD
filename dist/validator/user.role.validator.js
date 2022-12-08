"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Joi = require("joi");
exports.register = Joi.object({
    user_id: Joi.number().required(),
    role_id: Joi.number().required(),
    company_id: Joi.number().required(),
}).options({ abortEarly: false });
//# sourceMappingURL=user.role.validator.js.map