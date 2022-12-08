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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrimService = void 0;
const common_1 = require("@nestjs/common");
let TrimService = class TrimService {
    constructor(trimRepository, tireRepository, userRepository) {
        this.trimRepository = trimRepository;
        this.tireRepository = tireRepository;
        this.userRepository = userRepository;
    }
    async saveUserTrim(saveUserTrimDto, res) {
        const queryRunner = await getConnection().createQueryRunner();
        await queryRunner.startTransaction();
        const findUser = await this.userRepository.findUser(saveUserTrimDto.id);
        try {
            const createTrim = await this.trimRepository.saveUserTrim(queryRunner.manager, findUser, saveUserTrimDto.trimId);
            await this.tireRepository.saveTrimTire(queryRunner.manager, createTrim, res);
            await queryRunner.commitTransaction();
            return createTrim;
        }
        catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
TrimService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof TrimRepository !== "undefined" && TrimRepository) === "function" ? _a : Object, typeof (_b = typeof TireRepository !== "undefined" && TireRepository) === "function" ? _b : Object, typeof (_c = typeof UserRepository !== "undefined" && UserRepository) === "function" ? _c : Object])
], TrimService);
exports.TrimService = TrimService;
//# sourceMappingURL=trimService.js.map