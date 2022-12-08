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
exports.TrimRepository = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let TrimRepository = class TrimRepository extends typeorm_1.Repository {
    async saveUserTrim(transactionManager, findUser, trimId) {
        const findTrim = await transactionManager.findOne(Trim, {
            trimId: trimId,
            user: findUser,
        });
        if (findTrim) {
            throw new TrimOverlapException();
        }
        const createTrim = transactionManager.create(Trim, {
            trimId: trimId,
            user: findUser,
        });
        return await transactionManager.save(Trim, createTrim);
    }
};
__decorate([
    __param(0, TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.EntityManager,
        user_entity_1.default, Number]),
    __metadata("design:returntype", Promise)
], TrimRepository.prototype, "saveUserTrim", null);
TrimRepository = __decorate([
    (0, typeorm_1.EntityRepository)(Trim)
], TrimRepository);
exports.TrimRepository = TrimRepository;
//# sourceMappingURL=trimRepository.js.map