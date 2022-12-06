import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPlansService } from './companies_plans.service';

describe('CompaniesPlansService', () => {
  let service: CompaniesPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesPlansService],
    }).compile();

    service = module.get<CompaniesPlansService>(CompaniesPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
