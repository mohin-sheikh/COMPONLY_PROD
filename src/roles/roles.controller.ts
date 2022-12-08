import {
  Controller,
  Post,
  Body,
  UsePipes,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { message } from 'src/config/response.message.config';
import { register } from 'src/validator/roles.validator';

@ApiTags('ROLES')
@Controller('roles')
export class RolesController {
  private readonly logger = new Logger(RolesService.name);
  constructor(private readonly rolesService: RolesService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe(register))
  @ApiBody({ type: CreateRoleDto })
  @ApiCreatedResponse({
    description: message.registerSuccess,
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const roles = await this.rolesService.create(createRoleDto);
      return {
        status: HttpStatus.CREATED,
        message: message.registerSuccess,
        response: {
          id: roles.id,
          title: roles.title,
          description: roles.description,
          permission: roles.permission,
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
