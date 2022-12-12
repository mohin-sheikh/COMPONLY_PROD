import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import User from './entities/user.entity';
import { Payload } from 'src/auth/types/payload';
import Users from './entities/user.entity';
import StripeService from 'src/stripe/stripe.service';
import { CompanyService } from 'src/company/company.service';
import { PlansService } from 'src/plans/plans.service';
import { CompanyUserMapService } from 'src/companyUserMap/companyUserMap.service';
import { UserRolesService } from 'src/user_roles/user_roles.service';
import { CompaniesPlansService } from 'src/companies_plans/companies_plans.service';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private companyService: CompanyService,
    private plansService: PlansService,
    private companiesPlansService: CompaniesPlansService,
    private companyUserMapService: CompanyUserMapService,
    private userRolesService: UserRolesService,
    private stripeService: StripeService,
    private readonly entityManager: EntityManager,
  ) {}

  async findByEmail(email: any) {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email: email })
      .orWhere('users.alternate_email = :alternate_email', {
        alternate_email: email,
      })
      .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
      .getOne();
  }

  async findByPayload(payload: Payload) {
    return this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });
  }

  async create(registerUserDto: RegisterUserDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.entityManager.transaction(async (manager: EntityManager) => {
          const stripeCustomer = await this.stripeService.createCustomer(
            registerUserDto.user.full_name,
            registerUserDto.user.email,
          );

          const user = this.userRepository.create({
            full_name: registerUserDto.user.full_name,
            email: registerUserDto.user.email,
            password: registerUserDto.user.password,
            stripe_customer_id: stripeCustomer.id,
            stripe_card_id: registerUserDto.user.stripe_card_id,
            invitation_id: registerUserDto.user.invitation_id,
            profile: registerUserDto.user.profile,
            created_at: new Date(),
            updated_at: new Date(),
          });
          await manager.save(user);

          const company = await this.companyService.create(
            registerUserDto.company,
          );
          await manager.save(company);

          const companyUserMap = await this.companyUserMapService.create(
            user.id,
            company.id,
          );
          await manager.save(companyUserMap);

          const plan = await this.plansService.create(registerUserDto.plan);
          await manager.save(plan);

          const companiesPlans = await this.companiesPlansService.create(
            company.id,
            plan.id,
            user.id,
          );
          await manager.save(companiesPlans);

          const userRole = await this.userRolesService.create(
            1,
            user.id,
            company.id,
          );
          await manager.save(userRole);

          resolve(user);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  add(user: any) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: any) {
    return this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.full_name',
        'users.email',
        'users.stripe_customer_id',
        'users.profile',
      ])
      .where('users.id = :id', { id: id })
      .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
      .getOne();
  }

  async update(id: any, modify: any) {
    return this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set(modify)
      .where('id = :id', { id: id })
      .execute();
  }

  async findUserDetail(id: string) {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id: id })
      .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
      .getOne();
  }
}
