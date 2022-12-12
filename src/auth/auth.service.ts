import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { Payload } from './types/payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  async signPayload(payload: Payload) {
    return sign({ payload }, process.env.JWT_SECRET, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return this.userService.findByPayload(payload);
  }

  googleLogin(req: { user: any }) {
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
