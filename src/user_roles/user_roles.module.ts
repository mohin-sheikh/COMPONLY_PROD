import { Module } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User_Roles from './entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User_Roles])],
  providers: [UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
