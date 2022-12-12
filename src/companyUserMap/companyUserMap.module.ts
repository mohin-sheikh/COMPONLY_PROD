import { Module } from '@nestjs/common';
import { CompanyUserMapService } from './companyUserMap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import companyUserMap from './entities/companyUserMap';

@Module({
  imports: [TypeOrmModule.forFeature([companyUserMap])],
  providers: [CompanyUserMapService],
  exports: [CompanyUserMapService],
})
export class CompanyUserMapModule {}
