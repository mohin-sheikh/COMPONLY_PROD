import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import StripeService from 'src/stripe/stripe.service';
import { ConfigService } from '@nestjs/config';
import { CompanyModule } from 'src/company/company.module';
import { PlansModule } from 'src/plans/plans.module';
import { CompanyUserMapModule } from 'src/companyUserMap/companyUserMap.module';
import { UserRolesModule } from 'src/user_roles/user_roles.module';
import { CompaniesPlansModule } from 'src/companies_plans/companies_plans.module';

@Module({
  imports: [
    PassportModule,
    CompanyModule,
    CompaniesPlansModule,
    PlansModule,
    CompanyUserMapModule,
    UserRolesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, StripeService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
