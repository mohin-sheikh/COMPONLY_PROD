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
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
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
    async create(userDTO) {
        const user = this.userRepository.create({
            full_name: userDTO.first_name + ' ' + userDTO.last_name,
            first_name: userDTO.first_name,
            last_name: userDTO.last_name,
            email: userDTO.email,
            password: userDTO.password,
            stripe_card_id: userDTO.stripe_card_id,
            company_id: userDTO.company_id,
            invitation_id: userDTO.invitation_id,
            profile: userDTO.profile,
            created_at: new Date(),
            updated_at: new Date(),
        });
        await this.userRepository.save(user);
        return user;
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map