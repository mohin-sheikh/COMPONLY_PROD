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
exports.UserRolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_role_entity_1 = require("./entities/user_role.entity");
const typeorm_2 = require("typeorm");
let UserRolesService = class UserRolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(role_id, user_id, company_id) {
        const role = this.roleRepository.create({
            role_id: role_id,
            user_id: user_id,
            company_id: company_id,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return role;
    }
};
UserRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_role_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRolesService);
exports.UserRolesService = UserRolesService;
//# sourceMappingURL=user_roles.service.js.map