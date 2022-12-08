import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  UsePipes,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { message } from 'src/config/response.message.config';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import { register } from 'src/validator/invitation.validator';

@ApiTags('INVITATIONS')
@Controller('invitations')
export class InvitationsController {
  private readonly logger = new Logger(InvitationsService.name);
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe(register))
  @ApiBody({ type: CreateInvitationDto })
  @ApiCreatedResponse({
    description: message.sentInvitationSuccess,
  })
  async create(@Body() createInvitationDto: CreateInvitationDto) {
    try {
      const invitation = await this.invitationsService.create(
        createInvitationDto,
      );
      return {
        status: HttpStatus.CREATED,
        message: message.sentInvitationSuccess,
        response: {
          id: invitation.id,
          admin_id: invitation.admin_id,
          role_id: invitation.role_id,
          company_id: invitation.company_id,
          email: invitation.email,
          status: invitation.status,
        },
      };
    } catch (error) {
      this.logger.log('create - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }
}
