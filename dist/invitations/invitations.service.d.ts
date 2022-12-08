import { Repository } from 'typeorm';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import Invitations from './entities/invitation.entity';
export declare class InvitationsService {
    private invitationRepository;
    constructor(invitationRepository: Repository<Invitations>);
    create(createInvitation: CreateInvitationDto): Promise<Invitations>;
}
