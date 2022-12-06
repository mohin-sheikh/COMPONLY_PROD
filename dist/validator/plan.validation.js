"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Joi = require("joi");
exports.register = Joi.object({
    title: Joi.string(),
    subtitle: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    period: Joi.string()
        .lowercase()
        .valid(...['null', 'month', 'year']),
    features: Joi.string(),
}).options({ abortEarly: false });
//# sourceMappingURL=plan.validation.js.map