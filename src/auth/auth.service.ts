import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const customer = await this.customerService.findOne({ email });

    if (customer?.password !== password) {
      throw new UnauthorizedException();
    }

    if (!customer.verified) {
      throw new UnauthorizedException('Email is not verified');
    }

    const payload = {
      id: customer.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: '7d', // longer lifespan for refresh token
      }),
    };
  }

  async signUp(email: string, password: string) {
    const verificationToken = await this.jwtService.signAsync(
      {
        email,
      },
      {
        secret: jwtConstants.verifySecret,
        expiresIn: '24h',
      },
    );

    await this.customerService.create({
      email,
      password,
      verificationToken,
    });

    // In real world there should be an emailService which we will be used to send email with link to customer
    // but there was no such requirement in assignment, so just console.log it
    console.log(
      `Verification token for customer with email ${email}: ${verificationToken}`,
    );
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      return {
        access_token: this.jwtService.sign({
          id: decoded.id,
        }),
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async verifyEmail(token: string) {
    const { email } = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.verifySecret,
    });

    await this.customerService.update(
      { email },
      { verificationToken: '', verified: true },
    );

    return true;
  }
}
