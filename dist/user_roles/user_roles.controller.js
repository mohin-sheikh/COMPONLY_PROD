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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesController = void 0;
const common_1 = require("@nestjs/common");
const user_roles_service_1 = require("./user_roles.service");
const create_user_role_dto_1 = require("./dto/create-user_role.dto");
const validation_pipe_1 = require("../users/pipes/validation.pipe");
const swagger_1 = require("@nestjs/swagger");
const response_message_config_1 = require("../config/response.message.config");
const user_role_validator_1 = require("../validator/user.role.validator");
let UserRolesController = class UserRolesController {
    constructor(userRolesService) {
        this.userRolesService = userRolesService;
        this.logger = new common_1.Logger(user_roles_service_1.UserRolesService.name);
    }
    async create(createUserRoleDto) {
        try {
            const roles = await this.userRolesService.create(createUserRoleDto);
            return {
                status: common_1.HttpStatus.CREATED,
                message: response_message_config_1.message.registerSuccess,
                response: {
                    id: roles.id,
                    role_id: roles.role_id,
                    user_id: roles.user_id,
                    company_id: roles.company_id,
                },
            };
        }
        catch (error) {
            this.logger.log('create - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(user_role_validator_1.register)),
    (0, swagger_1.ApiBody)({ type: create_user_role_dto_1.CreateUserRoleDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: response_message_config_1.message.registerSuccess,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_role_dto_1.CreateUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "create", null);
UserRolesController = __decorate([
    (0, swagger_1.ApiTags)('USER-ROLES'),
    (0, common_1.Controller)('user-roles'),
    __metadata("design:paramtypes", [user_roles_service_1.UserRolesService])
], UserRolesController);
exports.UserRolesController = UserRolesController;
//# sourceMappingURL=user_roles.controller.js.map