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
exports.PlansController = void 0;
const common_1 = require("@nestjs/common");
const plans_service_1 = require("./plans.service");
const create_plan_dto_1 = require("./dto/create-plan.dto");
const jwt_auth_guard_1 = require("../users/jwt-auth.guard");
const validation_pipe_1 = require("../users/pipes/validation.pipe");
const swagger_1 = require("@nestjs/swagger");
const plan_validation_1 = require("../validator/plan.validation");
const response_message_config_1 = require("../config/response.message.config");
let PlansController = class PlansController {
    constructor(plansService) {
        this.plansService = plansService;
        this.logger = new common_1.Logger(plans_service_1.PlansService.name);
    }
    async create(createPlanDto) {
        try {
            const plan = await this.plansService.create(createPlanDto);
            return {
                status: common_1.HttpStatus.CREATED,
                message: response_message_config_1.message.registerSuccess,
                response: {
                    id: plan.id,
                    title: plan.title,
                    subtitle: plan.subtitle,
                    description: plan.description,
                    price: plan.price,
                    period: plan.period,
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
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(plan_validation_1.register)),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiBody)({ type: create_plan_dto_1.CreatePlanDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: response_message_config_1.message.registerSuccess,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "create", null);
PlansController = __decorate([
    (0, swagger_1.ApiTags)('PLANS'),
    (0, common_1.Controller)('plans'),
    __metadata("design:paramtypes", [plans_service_1.PlansService])
], PlansController);
exports.PlansController = PlansController;
//# sourceMappingURL=plans.controller.js.map