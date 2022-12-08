import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Companies from '../company/entities/company.entity';
import Companies_plans from 'src/companies_plans/entities/companies_plan.entity';
import Plans from 'src/plans/entities/plan.entity';
import Roles from 'src/roles/entities/role.entity';
import User_Roles from 'src/user_roles/entities/user_role.entity';
import Invitations from 'src/invitations/entities/invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          User,
          Companies,
          Companies_plans,
          Plans,
          Roles,
          User_Roles,
          Invitations,
        ],
      }),
    }),
  ],
})
export class DatabaseModule {}
