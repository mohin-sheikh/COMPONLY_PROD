import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import companies from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([companies])],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
