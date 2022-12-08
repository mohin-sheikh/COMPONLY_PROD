import { Module } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { UserRolesController } from './user_roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User_Roles from './entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User_Roles])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
