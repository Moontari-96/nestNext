import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 기본 전략으로 'jwt' 설정
    JwtModule.register({
      secret: 'taris_key', // JWT 비밀키 (환경 변수 사용 권장)
      signOptions: { expiresIn: '1h' }, // JWT 만료 시간
    }),
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
