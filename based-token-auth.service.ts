import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from './user-service';


@Injectable()
export class BasedTokenAuthService {
    
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.prisma.users.findUnique({where: {email: email}});
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email }; // include user's email in the payload
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

}
