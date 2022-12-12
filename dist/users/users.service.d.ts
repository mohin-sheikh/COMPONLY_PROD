import { Repository, EntityManager } from 'typeorm';
import User from './entities/user.entity';
import { Payload } from 'src/auth/types/payload';
import StripeService from 'src/stripe/stripe.service';
import { CompanyService } from 'src/company/company.service';
import { PlansService } from 'src/plans/plans.service';
import { CompanyUserMapService } from 'src/companyUserMap/companyUserMap.service';
import { UserRolesService } from 'src/user_roles/user_roles.service';
import { CompaniesPlansService } from 'src/companies_plans/companies_plans.service';
import { RegisterUserDto } from './dto/register.dto';
export declare class UsersService {
    private userRepository;
    private companyService;
    private plansService;
    private companiesPlansService;
    private companyUserMapService;
    private userRolesService;
    private stripeService;
    private readonly entityManager;
    constructor(userRepository: Repository<User>, companyService: CompanyService, plansService: PlansService, companiesPlansService: CompaniesPlansService, companyUserMapService: CompanyUserMapService, userRolesService: UserRolesService, stripeService: StripeService, entityManager: EntityManager);
    findByEmail(email: any): Promise<User>;
    findByPayload(payload: Payload): Promise<User>;
    create(registerUserDto: RegisterUserDto): Promise<any>;
    add(user: any): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: any): Promise<User>;
    update(id: any, modify: any): Promise<import("typeorm").UpdateResult>;
    findUserDetail(id: string): Promise<User>;
}
