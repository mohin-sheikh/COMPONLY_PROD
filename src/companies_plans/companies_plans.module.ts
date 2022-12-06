import { Module } from '@nestjs/common';
import { CompaniesPlansService } from './companies_plans.service';
import { CompaniesPlansController } from './companies_plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Companies_plans from './entities/companies_plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies_plans])],
  controllers: [CompaniesPlansController],
  providers: [CompaniesPlansService],
})
export class CompaniesPlansModule {}
