"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Joi = require("joi");
exports.register = Joi.object({
    title: Joi.string().required().min(3).max(35).required(),
    description: Joi.string().required(),
    permission: Joi.string()
        .required()
        .valid(...['admin', 'guest', 'restricted member', 'editor']),
}).options({ abortEarly: false });
//# sourceMappingURL=roles.validator.js.map