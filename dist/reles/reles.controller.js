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
exports.RelesController = void 0;
const common_1 = require("@nestjs/common");
const reles_service_1 = require("./reles.service");
const create_rele_dto_1 = require("./dto/create-rele.dto");
const update_rele_dto_1 = require("./dto/update-rele.dto");
let RelesController = class RelesController {
    constructor(relesService) {
        this.relesService = relesService;
    }
    create(createReleDto) {
        return this.relesService.create(createReleDto);
    }
    findAll() {
        return this.relesService.findAll();
    }
    findOne(id) {
        return this.relesService.findOne(+id);
    }
    update(id, updateReleDto) {
        return this.relesService.update(+id, updateReleDto);
    }
    remove(id) {
        return this.relesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rele_dto_1.CreateReleDto]),
    __metadata("design:returntype", void 0)
], RelesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rele_dto_1.UpdateReleDto]),
    __metadata("design:returntype", void 0)
], RelesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelesController.prototype, "remove", null);
RelesController = __decorate([
    (0, common_1.Controller)('reles'),
    __metadata("design:paramtypes", [reles_service_1.RelesService])
], RelesController);
exports.RelesController = RelesController;
//# sourceMappingURL=reles.controller.js.map