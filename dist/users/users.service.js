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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_entity_2 = require("./entities/user.entity");
const stripe_service_1 = require("../stripe/stripe.service");
const company_service_1 = require("../company/company.service");
const plans_service_1 = require("../plans/plans.service");
const companyUserMap_service_1 = require("../companyUserMap/companyUserMap.service");
const user_roles_service_1 = require("../user_roles/user_roles.service");
const companies_plans_service_1 = require("../companies_plans/companies_plans.service");
let UsersService = class UsersService {
    constructor(userRepository, companyService, plansService, companiesPlansService, companyUserMapService, userRolesService, stripeService, entityManager) {
        this.userRepository = userRepository;
        this.companyService = companyService;
        this.plansService = plansService;
        this.companiesPlansService = companiesPlansService;
        this.companyUserMapService = companyUserMapService;
        this.userRolesService = userRolesService;
        this.stripeService = stripeService;
        this.entityManager = entityManager;
    }
    async findByEmail(email) {
        return this.userRepository
            .createQueryBuilder('users')
            .where('users.email = :email', { email: email })
            .orWhere('users.alternate_email = :alternate_email', {
            alternate_email: email,
        })
            .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
            .getOne();
    }
    async findByPayload(payload) {
        return this.userRepository.findOne({
            where: {
                id: payload.id,
            },
        });
    }
    async create(registerUserDto) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.entityManager.transaction(async (manager) => {
                    const stripeCustomer = await this.stripeService.createCustomer(registerUserDto.user.full_name, registerUserDto.user.email);
                    const user = this.userRepository.create({
                        full_name: registerUserDto.user.full_name,
                        email: registerUserDto.user.email,
                        password: registerUserDto.user.password,
                        stripe_customer_id: stripeCustomer.id,
                        stripe_card_id: registerUserDto.user.stripe_card_id,
                        invitation_id: registerUserDto.user.invitation_id,
                        profile: registerUserDto.user.profile,
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                    await manager.save(user);
                    const company = await this.companyService.create(registerUserDto.company);
                    await manager.save(company);
                    const companyUserMap = await this.companyUserMapService.create(user.id, company.id);
                    await manager.save(companyUserMap);
                    const plan = await this.plansService.create(registerUserDto.plan);
                    await manager.save(plan);
                    const companiesPlans = await this.companiesPlansService.create(company.id, plan.id, user.id);
                    await manager.save(companiesPlans);
                    const userRole = await this.userRolesService.create(1, user.id, company.id);
                    await manager.save(userRole);
                    resolve(user);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    add(user) {
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        return this.userRepository
            .createQueryBuilder('users')
            .select([
            'users.id',
            'users.full_name',
            'users.email',
            'users.stripe_customer_id',
            'users.profile',
        ])
            .where('users.id = :id', { id: id })
            .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
            .getOne();
    }
    async update(id, modify) {
        return this.userRepository
            .createQueryBuilder()
            .update(user_entity_2.default)
            .set(modify)
            .where('id = :id', { id: id })
            .execute();
    }
    async findUserDetail(id) {
        return this.userRepository
            .createQueryBuilder('users')
            .where('users.id = :id', { id: id })
            .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
            .getOne();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        company_service_1.CompanyService,
        plans_service_1.PlansService,
        companies_plans_service_1.CompaniesPlansService,
        companyUserMap_service_1.CompanyUserMapService,
        user_roles_service_1.UserRolesService,
        stripe_service_1.default,
        typeorm_2.EntityManager])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map