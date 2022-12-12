import { UsersService } from '../users/users.service';
import { Payload } from './types/payload';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userService;
    private configService;
    constructor(userService: UsersService, configService: ConfigService);
    signPayload(payload: Payload): Promise<string>;
    validateUser(payload: Payload): Promise<import("../users/entities/user.entity").default>;
    googleLogin(req: {
        user: any;
    }): {
        message: string;
        user: any;
    };
}
