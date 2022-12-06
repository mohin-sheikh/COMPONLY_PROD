import { HttpStatus } from '@nestjs/common';
import ResetPassDTO from './dto/reset-pass.dto';
import { UpdateDto } from './dto/update.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    selfUser(request: any): Promise<import("./entities/user.entity").default> | {
        status: HttpStatus;
        error: any;
        response: {};
    };
    findOne(id: number): Promise<{
        status: HttpStatus;
        message: string;
        response: {};
        error?: undefined;
    } | {
        status: HttpStatus;
        message: string;
        response: import("./entities/user.entity").default;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {};
        message?: undefined;
    }>;
    update(request: any, updateUserDto: UpdateDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {};
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {};
        message?: undefined;
    }>;
    resetPassword(request: any, resetPassDTO: ResetPassDTO): Promise<{
        status: HttpStatus;
        message: string;
        response: {};
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {};
        message?: undefined;
    }>;
}
