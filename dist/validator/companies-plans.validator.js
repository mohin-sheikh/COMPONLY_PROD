"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Joi = require("joi");
exports.register = Joi.object({
    company_id: Joi.number().required(),
    plan_id: Joi.number(),
    status: Joi.string(),
}).options({ abortEarly: false });
//# sourceMappingURL=companies-plans.validator.js.map