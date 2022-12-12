import User_Roles from 'src/user_roles/entities/user_role.entity';
import { Repository } from 'typeorm';
export declare class UserRolesService {
    private roleRepository;
    constructor(roleRepository: Repository<User_Roles>);
    create(role_id: number, user_id: number, company_id: number): Promise<User_Roles>;
}
