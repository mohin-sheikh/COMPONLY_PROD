"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const database_module_1 = require("./database/database.module");
const logger_middleware_1 = require("./logger.middleware");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const company_module_1 = require("./company/company.module");
const companies_plans_module_1 = require("./companies_plans/companies_plans.module");
const plans_module_1 = require("./plans/plans.module");
const companyUserMap_module_1 = require("./companyUserMap/companyUserMap.module");
const roles_module_1 = require("./roles/roles.module");
const user_roles_module_1 = require("./user_roles/user_roles.module");
const invitations_module_1 = require("./invitations/invitations.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule,
            company_module_1.CompanyModule,
            companies_plans_module_1.CompaniesPlansModule,
            plans_module_1.PlansModule,
            invitations_module_1.InvitationsModule,
            companyUserMap_module_1.CompanyUserMapModule,
            roles_module_1.RolesModule,
            user_roles_module_1.UserRolesModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, auth_service_1.AuthService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map