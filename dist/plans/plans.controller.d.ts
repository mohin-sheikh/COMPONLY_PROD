import { HttpStatus } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
export declare class PlansController {
    private readonly plansService;
    private readonly logger;
    constructor(plansService: PlansService);
    create(createPlanDto: CreatePlanDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            id: number;
            title: string;
            subtitle: string;
            description: string;
            price: number;
            period: string;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            id?: undefined;
            title?: undefined;
            subtitle?: undefined;
            description?: undefined;
            price?: undefined;
            period?: undefined;
        };
        message?: undefined;
    }>;
}
