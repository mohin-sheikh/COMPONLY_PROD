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
exports.CompaniesPlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const companies_plan_entity_1 = require("./entities/companies_plan.entity");
const typeorm_2 = require("typeorm");
let CompaniesPlansService = class CompaniesPlansService {
    constructor(companiesPlansRepository) {
        this.companiesPlansRepository = companiesPlansRepository;
    }
    async create(createCompaniesPlanDto, user) {
        const companiesPlan = this.companiesPlansRepository.create({
            company_id: createCompaniesPlanDto.company_id,
            plan_id: createCompaniesPlanDto.plan_id,
            status: createCompaniesPlanDto.status,
            admin_id: user.id,
            updated_by: user.id,
            bought_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
        });
        await this.companiesPlansRepository.save(companiesPlan);
        return companiesPlan;
    }
};
CompaniesPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(companies_plan_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompaniesPlansService);
exports.CompaniesPlansService = CompaniesPlansService;
//# sourceMappingURL=companies_plans.service.js.map