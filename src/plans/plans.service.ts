import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Repository } from 'typeorm';
import Plans from './entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plans)
    private planRepository: Repository<Plans>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.create({
      ...createPlanDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return plan;
  }
}
