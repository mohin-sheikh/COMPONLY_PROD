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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const bcrypt = require("bcrypt");
const create_dto_1 = require("../users/dto/create.dto");
const validation_pipe_1 = require("../users/pipes/validation.pipe");
const users_service_1 = require("../users/users.service");
const user_validator_1 = require("../validator/user.validator");
const auth_service_1 = require("./auth.service");
const email_login_dto_1 = require("./dto/email-login.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const moment = require("moment-timezone");
const mailTemplate = require("../helper/template.helper");
const forgot_passwordVerify_dto_1 = require("./dto/forgot-passwordVerify.dto");
const response_message_config_1 = require("../config/response.message.config");
const otp_service_helper_1 = require("../helper/otp.service.helper");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(auth_service_1.AuthService.name);
    }
    async create(createUserDto) {
        try {
            const findUser = await this.usersService.findByEmail(createUserDto.email);
            if (findUser) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.alreadyUseEmail,
                    response: {},
                };
            }
            const user = await this.usersService.create(createUserDto);
            await this.authService.sendMail(createUserDto.email, 'Welcome!', mailTemplate.welcome(user.first_name));
            return {
                status: common_1.HttpStatus.CREATED,
                message: response_message_config_1.message.RegisterUserSuccess,
                response: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    stripe_customer_id: user.stripe_customer_id,
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
    async login(loginDTO) {
        try {
            const user = await this.usersService.findByEmail(loginDTO.email);
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: response_message_config_1.message.notFound,
                    response: {},
                };
            }
            if (await bcrypt.compare(loginDTO.password, user.password)) {
                const token = await this.authService.signPayload(user);
                return {
                    status: common_1.HttpStatus.OK,
                    message: response_message_config_1.message.loginSuccess,
                    response: { token: token },
                };
            }
            else {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.notMatchPassword,
                    response: {},
                };
            }
        }
        catch (error) {
            this.logger.log('login - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
    async googleAuth(req) { }
    googleAuthRedirect(req) {
        if (!req.user) {
            return response_message_config_1.message.noUser;
        }
        return this.authService.googleLogin(req);
    }
    async forgotPassword(forgotPasswordDTO) {
        try {
            const user = await this.usersService.findByEmail(forgotPasswordDTO.email);
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: response_message_config_1.message.notFound,
                    response: {},
                };
            }
            user.otp = (0, otp_service_helper_1.generateOTP)();
            user.code_expiry = moment().add(15, 'minutes').toDate();
            await this.usersService.add(user);
            await this.authService.sendMail(forgotPasswordDTO.email, 'Verify Forgot Password', mailTemplate.forgotPass(user.first_name, user.otp));
            return {
                status: common_1.HttpStatus.OK,
                message: response_message_config_1.message.successSent,
                response: {},
            };
        }
        catch (error) {
            this.logger.log('forgotPassword - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
    async forgotPasswordVerify(verifyDTO) {
        try {
            const user = await this.usersService.findByEmail(verifyDTO.email);
            if (!user) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: response_message_config_1.message.notFound,
                    response: {},
                };
            }
            if (user.otp !== verifyDTO.otp) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.notMatchOTP,
                    response: {},
                };
            }
            if (await bcrypt.compare(verifyDTO.confirmPassword, user.password)) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.tryDiffPass,
                    response: {},
                };
            }
            if (moment(user.code_expiry).isBefore(moment())) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.otpExpire,
                    response: {},
                };
            }
            user.password = verifyDTO.confirmPassword;
            user.otp = null;
            user.code_expiry = null;
            await this.usersService.add(user);
            return {
                status: common_1.HttpStatus.OK,
                message: response_message_config_1.message.successReset + user.email,
                response: {},
            };
        }
        catch (error) {
            this.logger.log('forgotPasswordVerify - ', error);
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
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(user_validator_1.registerUserSchema)),
    (0, swagger_1.ApiCreatedResponse)({
        description: response_message_config_1.message.RegisterUserSuccess,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: response_message_config_1.message.alreadyUseEmail,
    }),
    (0, swagger_1.ApiBody)({ type: create_dto_1.default }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOkResponse)({
        description: response_message_config_1.message.loginSuccess,
    }),
    (0, swagger_1.ApiBody)({ type: email_login_dto_1.LoginWithEmail }),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(user_validator_1.login2FA)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_login_dto_1.LoginWithEmail]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/google/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('/google/redirect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Put)('/forgot-Password'),
    (0, swagger_1.ApiOkResponse)({
        description: response_message_config_1.message.successSent,
    }),
    (0, swagger_1.ApiBody)({ type: forgot_password_dto_1.ForgotPasswordDTO }),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(user_validator_1.forgotPass)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Put)('forgot-password/verify'),
    (0, swagger_1.ApiOkResponse)({
        description: response_message_config_1.message.successReset,
    }),
    (0, swagger_1.ApiBody)({ type: forgot_passwordVerify_dto_1.ForgotPasswordVerifyDTO }),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(user_validator_1.forgotPassVerify)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_passwordVerify_dto_1.ForgotPasswordVerifyDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPasswordVerify", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('AUTH'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map