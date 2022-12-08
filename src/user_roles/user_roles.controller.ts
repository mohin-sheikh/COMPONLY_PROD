import {
  Controller,
  Post,
  Body,
  Logger,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { message } from 'src/config/response.message.config';
import { register } from 'src/validator/user.role.validator';

@ApiTags('USER-ROLES')
@Controller('user-roles')
export class UserRolesController {
  private readonly logger = new Logger(UserRolesService.name);
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe(register))
  @ApiBody({ type: CreateUserRoleDto })
  @ApiCreatedResponse({
    description: message.registerSuccess,
  })
  async create(@Body() createUserRoleDto: CreateUserRoleDto) {
    try {
      const roles = await this.userRolesService.create(createUserRoleDto);
      return {
        status: HttpStatus.CREATED,
        message: message.registerSuccess,
        response: {
          id: roles.id,
          role_id: roles.role_id,
          user_id: roles.user_id,
          company_id: roles.company_id,
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
