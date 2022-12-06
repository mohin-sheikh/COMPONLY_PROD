import { CreatePlanDto } from './dto/create-plan.dto';
import { Repository } from 'typeorm';
import Plans from './entities/plan.entity';
export declare class PlansService {
    private planRepository;
    constructor(planRepository: Repository<Plans>);
    create(createPlanDto: CreatePlanDto): Promise<Plans>;
}
