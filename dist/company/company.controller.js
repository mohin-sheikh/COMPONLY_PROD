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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_message_config_1 = require("../config/response.message.config");
const jwt_auth_guard_1 = require("../users/jwt-auth.guard");
const validation_pipe_1 = require("../users/pipes/validation.pipe");
const company_validator_1 = require("../validator/company.validator");
const company_service_1 = require("./company.service");
const create_company_dto_1 = require("./dto/create-company.dto");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
        this.logger = new common_1.Logger(company_service_1.CompanyService.name);
    }
    async create(request, createCompanyDto) {
        try {
            const findCompany = await this.companyService.findByName(createCompanyDto.name);
            if (findCompany) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: response_message_config_1.message.alreadyUseName,
                    response: {},
                };
            }
            const company = await this.companyService.create(createCompanyDto, request.user.full_name);
            return {
                status: common_1.HttpStatus.CREATED,
                message: response_message_config_1.message.registerSuccess,
                response: {
                    id: company.id,
                    name: company.name,
                    logo: company.logo,
                    seats: company.seats,
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
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/register'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(company_validator_1.register)),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiBody)({ type: create_company_dto_1.default }),
    (0, swagger_1.ApiCreatedResponse)({
        description: response_message_config_1.message.registerSuccess,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: response_message_config_1.message.alreadyUseName,
    }),
    (0, swagger_1.ApiBody)({ type: create_company_dto_1.default }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_company_dto_1.default]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
CompanyController = __decorate([
    (0, swagger_1.ApiTags)('COMPANIES'),
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map