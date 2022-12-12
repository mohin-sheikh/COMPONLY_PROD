import { Module } from '@nestjs/common';
import { CompaniesPlansService } from './companies_plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Companies_plans from './entities/companies_plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies_plans])],
  providers: [CompaniesPlansService],
  exports: [CompaniesPlansService],
})
export class CompaniesPlansModule {}
