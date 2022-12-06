import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { CreateDto } from './dto/create.dto';
import { Payload } from 'src/auth/types/payload';
import Users from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: any) {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email: email })
      .orWhere('users.alternate_email = :alternate_email', {
        alternate_email: email,
      })
      .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
      .getOne();
  }

  async findByPayload(payload: Payload) {
    return this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });
  }

  async create(userDTO: CreateDto) {
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

  add(user: any) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: any) {
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

  async update(id: any, modify: any) {
    return this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set(modify)
      .where('id = :id', { id: id })
      .execute();
  }

  async findUserDetail(id: string) {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id: id })
      .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
      .getOne();
  }
}
