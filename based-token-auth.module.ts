import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { BasedTokenAuthService } from './based-token-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/passport/jwt.strategy';
import { UserService } from './user-service';
import { BasedTokenAuthController } from './based-token-auth.controller';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    
  ],
  controllers: [BasedTokenAuthController],
  providers: [BasedTokenAuthService, UserService, JwtStrategy]
})
export class BasedTokenAuthModule {}
