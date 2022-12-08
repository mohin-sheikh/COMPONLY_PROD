import { HttpStatus } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
export declare class UserRolesController {
    private readonly userRolesService;
    private readonly logger;
    constructor(userRolesService: UserRolesService);
    create(createUserRoleDto: CreateUserRoleDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            id: number;
            role_id: number;
            user_id: number;
            company_id: number;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            id?: undefined;
            role_id?: undefined;
            user_id?: undefined;
            company_id?: undefined;
        };
        message?: undefined;
    }>;
}
