import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPlansController } from './companies_plans.controller';
import { CompaniesPlansService } from './companies_plans.service';

describe('CompaniesPlansController', () => {
  let controller: CompaniesPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesPlansController],
      providers: [CompaniesPlansService],
    }).compile();

    controller = module.get<CompaniesPlansController>(CompaniesPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
