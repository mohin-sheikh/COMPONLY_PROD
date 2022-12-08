import { CreateUserRoleDto } from './dto/create-user_role.dto';
import User_Roles from 'src/user_roles/entities/user_role.entity';
import { Repository } from 'typeorm';
export declare class UserRolesService {
    private roleRepository;
    constructor(roleRepository: Repository<User_Roles>);
    create(createUserRoleDto: CreateUserRoleDto): Promise<User_Roles>;
}
