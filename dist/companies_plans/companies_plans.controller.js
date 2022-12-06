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
exports.CompaniesPlansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../users/jwt-auth.guard");
const validation_pipe_1 = require("../users/pipes/validation.pipe");
const response_message_1 = require("../utils/response.message");
const companies_plans_validator_1 = require("../validator/companies-plans.validator");
const companies_plans_service_1 = require("./companies_plans.service");
const create_companies_plan_dto_1 = require("./dto/create-companies_plan.dto");
let CompaniesPlansController = class CompaniesPlansController {
    constructor(companiesPlansService) {
        this.companiesPlansService = companiesPlansService;
        this.logger = new common_1.Logger(companies_plans_service_1.CompaniesPlansService.name);
    }
    async create(request, createCompanyDto) {
        try {
            const companyPlan = await this.companiesPlansService.create(createCompanyDto, request.user);
            return {
                status: common_1.HttpStatus.CREATED,
                message: response_message_1.message.RegisterCompanySuccess,
                response: {
                    id: companyPlan.id,
                    company_id: companyPlan.company_id,
                    plan_id: companyPlan.plan_id,
                    admin_id: companyPlan.admin_id,
                    status: companyPlan.status,
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
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(companies_plans_validator_1.register)),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiBody)({ type: create_companies_plan_dto_1.default }),
    (0, swagger_1.ApiCreatedResponse)({
        description: response_message_1.message.RegisterUserSuccess,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
    }),
    (0, swagger_1.ApiBody)({ type: create_companies_plan_dto_1.default }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_companies_plan_dto_1.default]),
    __metadata("design:returntype", Promise)
], CompaniesPlansController.prototype, "create", null);
CompaniesPlansController = __decorate([
    (0, swagger_1.ApiTags)('COMPANIES-PLANS'),
    (0, common_1.Controller)('companies-plans'),
    __metadata("design:paramtypes", [companies_plans_service_1.CompaniesPlansService])
], CompaniesPlansController);
exports.CompaniesPlansController = CompaniesPlansController;
//# sourceMappingURL=companies_plans.controller.js.map