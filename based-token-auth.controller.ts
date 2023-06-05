import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { BasedTokenAuthService } from './based-token-auth.service';
import { Request } from '@nestjs/common';
import { UserService } from './user-service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('based-token-auth')
export class BasedTokenAuthController {
  constructor(private readonly authService: BasedTokenAuthService, private readonly userService: UserService,) {}

  @Post('login')
async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.login(body.email, body.password);
    return { token };
  }


}
