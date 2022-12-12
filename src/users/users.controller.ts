import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Patch,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { resetPass, updateUserSchema } from 'src/validator/user.validator';
import ResetPassDTO from './dto/reset-pass.dto';
import { UpdateDto } from './dto/update.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ValidationPipe } from './pipes/validation.pipe';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { message } from 'src/config/response.message.config';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/self')
  selfUser(@Req() request) {
    try {
      return this.usersService.findByEmail(request.user.email);
    } catch (error) {
      this.logger.log('selfUser - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }
  @Get()
  async findOne(@Query('id') id: number) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: message.notFound,
          response: {},
        };
      }

      return {
        status: HttpStatus.OK,
        message: message.successFetched,
        response: user,
      };
    } catch (error) {
      this.logger.log('findOne - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/modify')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateDto })
  @ApiAcceptedResponse({
    description: message.successUpdate,
  })
  @ApiNotFoundResponse({
    description: message.notFound,
  })
  @ApiBadRequestResponse({
    description: message.alreadyInUse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UsePipes(new ValidationPipe(updateUserSchema))
  async update(@Req() request, @Body() updateUserDto: UpdateDto) {
    try {
      const user = await this.usersService.findUserDetail(request.user.id);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: message.notFound,
          response: {},
        };
      }

      const findByEmail = await this.usersService.findByEmail(
        updateUserDto.email
          ? updateUserDto.email === '' ||
            updateUserDto.email === undefined ||
            user.email === updateUserDto.email
            ? null
            : updateUserDto.email
          : updateUserDto.alternate_email === '' ||
            updateUserDto.alternate_email === undefined ||
            user.alternate_email === updateUserDto.alternate_email
          ? null
          : updateUserDto.alternate_email,
      );

      if (findByEmail) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.alreadyInUse,
          response: {},
        };
      }

      if (
        updateUserDto.alternate_email === updateUserDto.email &&
        updateUserDto.email !== undefined &&
        updateUserDto.alternate_email !== undefined
      ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.emailSame,
          response: {},
        };
      }

      const modify = {
        full_name:
          updateUserDto.full_name === '' ||
          updateUserDto.full_name === undefined
            ? user.full_name
            : updateUserDto.full_name,
        email:
          updateUserDto.email === '' || updateUserDto.email === undefined
            ? user.email
            : updateUserDto.email,
        alternate_email:
          updateUserDto.alternate_email === '' ||
          updateUserDto.alternate_email === undefined
            ? user.alternate_email
            : updateUserDto.alternate_email,
        profile:
          updateUserDto.profile === '' || updateUserDto.profile === undefined
            ? user.profile
            : updateUserDto.profile,
        updated_at: new Date(),
      };

      await this.usersService.update(user.id, modify);
      return {
        status: HttpStatus.ACCEPTED,
        message: message.successUpdate,
        response: {},
      };
    } catch (error) {
      this.logger.log('update - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/reset-password')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: ResetPassDTO })
  @ApiOkResponse({
    description: message.successChangedPass,
  })
  @ApiBadRequestResponse({
    description: message.tryDiffPass,
  })
  @ApiNotFoundResponse({
    description: message.notFound,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UsePipes(new ValidationPipe(resetPass))
  async resetPassword(@Req() request, @Body() resetPassDTO: ResetPassDTO) {
    try {
      const user = await this.usersService.findUserDetail(request.user.id);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: message.notFound,
          response: {},
        };
      }

      if (await bcrypt.compare(resetPassDTO.currentPass, user.password)) {
        if (await bcrypt.compare(resetPassDTO.confirmPass, user.password)) {
          return {
            status: HttpStatus.BAD_REQUEST,
            message: message.tryDiffPass,
            response: {},
          };
        }
        user.password = resetPassDTO.confirmPass;
        await this.usersService.add(user);
        return {
          status: HttpStatus.OK,
          message: message.successChangedPass,
          response: {},
        };
      } else {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.passWrong,
          response: {},
        };
      }
    } catch (error) {
      this.logger.log('resetPassword - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }
}
