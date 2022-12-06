import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ValidationPipe } from 'src/users/pipes/validation.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { message } from 'src/utils/response.message';
import { register } from 'src/validator/plan.validation';

@ApiTags('PLANS')
@Controller('plans')
export class PlansController {
  private readonly logger = new Logger(PlansService.name);
  constructor(private readonly plansService: PlansService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  @UsePipes(new ValidationPipe(register))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreatePlanDto })
  @ApiCreatedResponse({
    description: message.RegisterCompanySuccess,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async create(@Body() createPlanDto: CreatePlanDto) {
    try {
      const plan = await this.plansService.create(createPlanDto);
      return {
        status: HttpStatus.CREATED,
        message: message.RegisterCompanySuccess,
        response: {
          id: plan.id,
          title: plan.title,
          subtitle: plan.subtitle,
          description: plan.description,
          price: plan.price,
          period: plan.period,
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
