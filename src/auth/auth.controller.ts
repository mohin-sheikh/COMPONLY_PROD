import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import CreateDto from 'src/users/dto/create.dto';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import { UsersService } from 'src/users/users.service';
import {
  forgotPass,
  forgotPassVerify,
  login2FA,
  registerUserSchema,
} from 'src/validator/user.validator';
import { AuthService } from './auth.service';
import { LoginWithEmail } from './dto/email-login.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import * as moment from 'moment-timezone';
import * as mailTemplate from '../helper/template.helper';
import { ForgotPasswordVerifyDTO } from './dto/forgot-passwordVerify.dto';
import { message } from 'src/config/response.message.config';
import { generateOTP } from 'src/helper/otp.service.helper';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/register')
  @UsePipes(new ValidationPipe(registerUserSchema))
  @ApiCreatedResponse({
    description: message.RegisterUserSuccess,
  })
  @ApiBadRequestResponse({
    description: message.alreadyUseEmail,
  })
  @ApiBody({ type: CreateDto })
  async create(@Body() createUserDto: CreateDto) {
    try {
      const findUser = await this.usersService.findByEmail(createUserDto.email);
      if (findUser) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.alreadyUseEmail,
          response: {},
        };
      }

      const user = await this.usersService.create(createUserDto);

      await this.authService.sendMail(
        createUserDto.email,
        'Welcome!',
        mailTemplate.welcome(user.first_name),
      );

      return {
        status: HttpStatus.CREATED,
        message: message.RegisterUserSuccess,
        response: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
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

  @Post('/login')
  @ApiOkResponse({
    description: message.loginSuccess,
  })
  @ApiBody({ type: LoginWithEmail })
  @UsePipes(new ValidationPipe(login2FA))
  async login(@Body() loginDTO: LoginWithEmail) {
    try {
      const user = await this.usersService.findByEmail(loginDTO.email);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          error: message.notFound,
          response: {},
        };
      }
      if (await bcrypt.compare(loginDTO.password, user.password)) {
        const token = await this.authService.signPayload(user);
        return {
          status: HttpStatus.OK,
          message: message.loginSuccess,
          response: { token: token },
        };
      } else {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.notMatchPassword,
          response: {},
        };
      }
    } catch (error) {
      this.logger.log('login - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }

  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    if (!req.user) {
      return message.noUser;
    }
    return this.authService.googleLogin(req);
  }

  @Put('/forgot-Password')
  @ApiOkResponse({
    description: message.successSent,
  })
  @ApiBody({ type: ForgotPasswordDTO })
  @UsePipes(new ValidationPipe(forgotPass))
  async forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    try {
      const user = await this.usersService.findByEmail(forgotPasswordDTO.email);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          error: message.notFound,
          response: {},
        };
      }
      user.otp = generateOTP();
      user.code_expiry = moment().add(15, 'minutes').toDate(); // OTP valid for 15 minutes
      await this.usersService.add(user);

      await this.authService.sendMail(
        forgotPasswordDTO.email,
        'Verify Forgot Password',
        mailTemplate.forgotPass(user.first_name, user.otp),
      );
      return {
        status: HttpStatus.OK,
        message: message.successSent,
        response: {},
      };
    } catch (error) {
      this.logger.log('forgotPassword - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }

  @Put('forgot-password/verify')
  @ApiOkResponse({
    description: message.successReset,
  })
  @ApiBody({ type: ForgotPasswordVerifyDTO })
  @UsePipes(new ValidationPipe(forgotPassVerify))
  async forgotPasswordVerify(@Body() verifyDTO: ForgotPasswordVerifyDTO) {
    try {
      const user = await this.usersService.findByEmail(verifyDTO.email);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          error: message.notFound,
          response: {},
        };
      }

      if (user.otp !== verifyDTO.otp) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.notMatchOTP,
          response: {},
        };
      }

      if (await bcrypt.compare(verifyDTO.confirmPassword, user.password)) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.tryDiffPass,
          response: {},
        };
      }

      if (moment(user.code_expiry).isBefore(moment())) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.otpExpire,
          response: {},
        };
      }

      user.password = verifyDTO.confirmPassword;
      user.otp = null;
      user.code_expiry = null;
      await this.usersService.add(user);
      return {
        status: HttpStatus.OK,
        message: message.successReset + user.email,
        response: {},
      };
    } catch (error) {
      this.logger.log('forgotPasswordVerify - ', error);
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
        response: {},
      };
    }
  }
}
