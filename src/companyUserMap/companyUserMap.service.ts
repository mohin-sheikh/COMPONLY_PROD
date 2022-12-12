import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import companyUserMap from './entities/companyUserMap';

@Injectable()
export class CompanyUserMapService {
  constructor(
    @InjectRepository(companyUserMap)
    private companyUserRepository: Repository<companyUserMap>,
  ) {}

  async create(admin_id: number, company_id: number) {
    return this.companyUserRepository.create({
      admin_id: admin_id,
      company_id: company_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
