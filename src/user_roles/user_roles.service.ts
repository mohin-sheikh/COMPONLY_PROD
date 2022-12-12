import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User_Roles from 'src/user_roles/entities/user_role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(User_Roles)
    private roleRepository: Repository<User_Roles>,
  ) {}

  async create(role_id: number, user_id: number, company_id: number) {
    const role = this.roleRepository.create({
      role_id: role_id,
      user_id: user_id,
      company_id: company_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return role;
  }
}
