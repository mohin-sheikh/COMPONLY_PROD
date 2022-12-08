import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import Invitations from './entities/invitation.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitations)
    private invitationRepository: Repository<Invitations>,
  ) {}

  async create(createInvitation: CreateInvitationDto) {
    const invitation = this.invitationRepository.create({
      ...createInvitation,
      sent_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.invitationRepository.save(invitation);
    return invitation;
  }
}
