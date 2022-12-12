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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_validator_1 = require("../validator/user.validator");
const reset_pass_dto_1 = require("./dto/reset-pass.dto");
const update_dto_1 = require("./dto/update.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const validation_pipe_1 = require("./pipes/validation.pipe");
const users_service_1 = require("./users.service");
const bcrypt = require("bcrypt");
const response_message_config_1 = require("../config/response.message.config");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger(users_service_1.UsersService.name);
    }
    selfUser(request) {
        try {
            return this.usersService.findByEmail(request.user.email);
        }
        catch (error) {
            this.logger.log('selfUser - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
    async findOne(id) {
        try {
            const user = await this.usersService.findOne(+id);
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: response_message_config_1.message.notFound,
                    response: {},
                };
            }
            return {
                status: common_1.HttpStatus.OK,
                message: response_message_config_1.message.successFetched,
                response: user,
            };
        }
        catch (error) {
            this.logger.log('findOne - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
    async update(request, updateUserDto) {
        try {
            const user = await this.usersService.findUserDetail(request.user.id);
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: response_message_config_1.message.notFound,
                    response: {},
                };
            }
            const findByEmail = await this.usersService.findByEmail(updateUserDto.email
                ? updateUserDto.email === '' ||
                    updateUserDto.email === undefined ||
                    user.email === updateUserDto.email
                    ? null
                    : updateUserDto.email
                : updateUserDto.alternate_email === '' ||
                    updateUserDto.alternate_email === undefined ||
                    user.alternate_email === updateUserDto.alternate_email
                    ? null
                    : updateUserDto.alternate_email);
            if (findByEmail) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.alreadyInUse,
                    response: {},
                };
            }
            if (updateUserDto.alternate_email === updateUserDto.email &&
                updateUserDto.email !== undefined &&
                updateUserDto.alternate_email !== undefined) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.emailSame,
                    response: {},
                };
            }
            const modify = {
                full_name: updateUserDto.full_name === '' ||
                    updateUserDto.full_name === undefined
                    ? user.full_name
                    : updateUserDto.full_name,
                email: updateUserDto.email === '' || updateUserDto.email === undefined
                    ? user.email
                    : updateUserDto.email,
                alternate_email: updateUserDto.alternate_email === '' ||
                    updateUserDto.alternate_email === undefined
                    ? user.alternate_email
                    : updateUserDto.alternate_email,
                profile: updateUserDto.profile === '' || updateUserDto.profile === undefined
                    ? user.profile
                    : updateUserDto.profile,
                updated_at: new Date(),
            };
            await this.usersService.update(user.id, modify);
            return {
                status: common_1.HttpStatus.ACCEPTED,
                message: response_message_config_1.message.successUpdate,
                response: {},
            };
        }
        catch (error) {
            this.logger.log('update - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
    async resetPassword(request, resetPassDTO) {
        try {
            const user = await this.usersService.findUserDetail(request.user.id);
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: response_message_config_1.message.notFound,
                    response: {},
                };
            }
            if (await bcrypt.compare(resetPassDTO.currentPass, user.password)) {
                if (await bcrypt.compare(resetPassDTO.confirmPass, user.password)) {
                    return {
                        status: common_1.HttpStatus.BAD_REQUEST,
                        message: response_message_config_1.message.tryDiffPass,
                        response: {},
                    };
                }
                user.password = resetPassDTO.confirmPass;
                await this.usersService.add(user);
                return {
                    status: common_1.HttpStatus.OK,
                    message: response_message_config_1.message.successChangedPass,
                    response: {},
                };
            }
            else {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.passWrong,
                    response: {},
                };
            }
        }
        catch (error) {
            this.logger.log('resetPassword - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/self'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "selfUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/modify'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiBody)({ type: update_dto_1.UpdateDto }),
    (0, swagger_1.ApiAcceptedResponse)({
        description: response_message_config_1.message.successUpdate,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: response_message_config_1.message.notFound,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: response_message_config_1.message.alreadyInUse,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
    }),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(user_validator_1.updateUserSchema)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UpdateDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/reset-password'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiBody)({ type: reset_pass_dto_1.default }),
    (0, swagger_1.ApiOkResponse)({
        description: response_message_config_1.message.successChangedPass,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: response_message_config_1.message.tryDiffPass,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: response_message_config_1.message.notFound,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
    }),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(user_validator_1.resetPass)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reset_pass_dto_1.default]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('USER'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map