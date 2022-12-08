import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import Roles from './entities/role.entity';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Roles>);
    create(createRoleDto: CreateRoleDto): Promise<Roles>;
}
