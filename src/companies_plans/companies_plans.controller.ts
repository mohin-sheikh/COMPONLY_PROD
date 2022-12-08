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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { message } from 'src/config/response.message.config';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import { register } from 'src/validator/companies-plans.validator';
import { CompaniesPlansService } from './companies_plans.service';
import CreateCompaniesPlanDto from './dto/create-companies_plan.dto';

@ApiTags('COMPANIES-PLANS')
@Controller('companies-plans')
export class CompaniesPlansController {
  private readonly logger = new Logger(CompaniesPlansService.name);
  constructor(private readonly companiesPlansService: CompaniesPlansService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  @UsePipes(new ValidationPipe(register))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateCompaniesPlanDto })
  @ApiCreatedResponse({
    description: message.RegisterUserSuccess,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBody({ type: CreateCompaniesPlanDto })
  async create(
    @Req() request,
    @Body() createCompanyDto: CreateCompaniesPlanDto,
  ) {
    try {
      const companyPlan = await this.companiesPlansService.create(
        createCompanyDto,
        request.user,
      );
      return {
        status: HttpStatus.CREATED,
        message: message.registerSuccess,
        response: {
          id: companyPlan.id,
          company_id: companyPlan.company_id,
          plan_id: companyPlan.plan_id,
          admin_id: companyPlan.admin_id,
          status: companyPlan.status,
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
