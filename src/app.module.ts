import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './logger.middleware';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { CompaniesPlansModule } from './companies_plans/companies_plans.module';
import { PlansModule } from './plans/plans.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConfigModule,
    CompanyModule,
    CompaniesPlansModule,
    PlansModule,
    InvitationsModule,
    RolesModule,
    UserRolesModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
