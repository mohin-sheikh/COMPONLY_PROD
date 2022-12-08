import { HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesController {
    private readonly rolesService;
    private readonly logger;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            id: number;
            title: string;
            description: string;
            permission: string;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            id?: undefined;
            title?: undefined;
            description?: undefined;
            permission?: undefined;
        };
        message?: undefined;
    }>;
}
