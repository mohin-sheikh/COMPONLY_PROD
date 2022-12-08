import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { message } from 'src/config/response.message.config';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import { register } from 'src/validator/company.validator';
import { CompanyService } from './company.service';
import CreateCompanyDto from './dto/create-company.dto';

@ApiTags('COMPANIES')
@Controller('company')
export class CompanyController {
  private readonly logger = new Logger(CompanyService.name);
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  @UsePipes(new ValidationPipe(register))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedResponse({
    description: message.registerSuccess,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: message.alreadyUseName,
  })
  @ApiBody({ type: CreateCompanyDto })
  async create(@Req() request, @Body() createCompanyDto: CreateCompanyDto) {
    try {
      const findCompany = await this.companyService.findByName(
        createCompanyDto.name,
      );
      if (findCompany) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message.alreadyUseName,
          response: {},
        };
      }

      const company = await this.companyService.create(
        createCompanyDto,
        request.user.full_name,
      );
      return {
        status: HttpStatus.CREATED,
        message: message.registerSuccess,
        response: {
          id: company.id,
          name: company.name,
          logo: company.logo,
          seats: company.seats,
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
