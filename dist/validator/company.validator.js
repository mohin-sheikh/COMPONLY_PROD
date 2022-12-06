"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Joi = require("joi");
exports.register = Joi.object({
    name: Joi.string().lowercase().min(3).max(40).required(),
    logo: Joi.string(),
    seats: Joi.number(),
}).options({ abortEarly: false });
//# sourceMappingURL=company.validator.js.map