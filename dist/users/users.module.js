"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const stripe_service_1 = require("../stripe/stripe.service");
const config_1 = require("@nestjs/config");
const company_module_1 = require("../company/company.module");
const plans_module_1 = require("../plans/plans.module");
const companyUserMap_module_1 = require("../companyUserMap/companyUserMap.module");
const user_roles_module_1 = require("../user_roles/user_roles.module");
const companies_plans_module_1 = require("../companies_plans/companies_plans.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            company_module_1.CompanyModule,
            companies_plans_module_1.CompaniesPlansModule,
            plans_module_1.PlansModule,
            companyUserMap_module_1.CompanyUserMapModule,
            user_roles_module_1.UserRolesModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60s' },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.default]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, stripe_service_1.default, config_1.ConfigService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map