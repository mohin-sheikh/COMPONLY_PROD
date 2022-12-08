import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import Roles from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create({
      ...createRoleDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.roleRepository.save(role);
    return role;
  }
}
