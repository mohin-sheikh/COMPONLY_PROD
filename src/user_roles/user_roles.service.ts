import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import User_Roles from 'src/user_roles/entities/user_role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(User_Roles)
    private roleRepository: Repository<User_Roles>,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const role = this.roleRepository.create({
      ...createUserRoleDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.roleRepository.save(role);
    return role;
  }
}
