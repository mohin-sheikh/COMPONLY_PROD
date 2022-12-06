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
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConfigModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
      }),
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
