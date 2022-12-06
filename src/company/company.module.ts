import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import companies from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([companies])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
