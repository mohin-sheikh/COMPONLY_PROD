"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let ValidationPipe = class ValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new common_1.BadRequestException({
                status: 400,
                message: 'Validation failed - ' + error.message.replace(/(\"|\[|\d\])/g, ''),
                response: {},
            });
        }
        if (value.full_name) {
            value.full_name = value.full_name.toLowerCase().trimStart().trimEnd();
        }
        if (value.email) {
            value.email = value.email.toLowerCase().trim();
        }
        if (value.alternate_email) {
            value.alternate_email = value.alternate_email.toLowerCase().trim();
        }
        if (value.period) {
            value.period = value.period.toLowerCase();
        }
        if (value.permission) {
            value.permission = value.permission.toLowerCase();
        }
        if (value.current_status) {
            value.current_status = value.current_status.toLowerCase();
        }
        return value;
    }
};
ValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map