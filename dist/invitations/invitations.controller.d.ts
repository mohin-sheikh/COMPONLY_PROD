import { HttpStatus } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
export declare class InvitationsController {
    private readonly invitationsService;
    private readonly logger;
    constructor(invitationsService: InvitationsService);
    create(createInvitationDto: CreateInvitationDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            id: number;
            admin_id: number;
            role_id: number;
            company_id: number;
            email: string;
            status: string;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            id?: undefined;
            admin_id?: undefined;
            role_id?: undefined;
            company_id?: undefined;
            email?: undefined;
            status?: undefined;
        };
        message?: undefined;
    }>;
}
