import { HttpStatus } from '@nestjs/common';
import CreateDto from 'src/users/dto/create.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginWithEmail } from './dto/email-login.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ForgotPasswordVerifyDTO } from './dto/forgot-passwordVerify.dto';
export declare class AuthController {
    private readonly authService;
    private usersService;
    private readonly logger;
    constructor(authService: AuthService, usersService: UsersService);
    create(createUserDto: CreateDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            id?: undefined;
            full_name?: undefined;
            email?: undefined;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        message: string;
        response: {
            id: number;
            full_name: string;
            email: string;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            id?: undefined;
            full_name?: undefined;
            email?: undefined;
        };
        message?: undefined;
    }>;
    login(loginDTO: LoginWithEmail): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            token: string;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        message: string;
        response: {
            token?: undefined;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            token?: undefined;
        };
        message?: undefined;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): string | {
        message: string;
        user: any;
    };
    forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<{
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
    forgotPasswordVerify(verifyDTO: ForgotPasswordVerifyDTO): Promise<{
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
