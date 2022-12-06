import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { Payload } from './types/payload';
import { ConfigService } from '@nestjs/config';
import * as mailgun from 'mailgun-js';

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

  async sendMail(email: string, subject: string, text: any) {
    const mg = mailgun({
      apiKey: this.configService.get<string>('API_KEY'),
      domain: this.configService.get<string>('DOMAIN'),
      host: this.configService.get<string>('MAILGUN_HOST'),
    });

    const data = {
      from: this.configService.get<string>('FROM_EMAIL'),
      to: email,
      subject: subject,
      html: text,
    };

    mg.messages().send(data, function (error, body) {
      if (error) {
        console.log(error);
      }
      console.log(body);
      return;
    });
  }
}
