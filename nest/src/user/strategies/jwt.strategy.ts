import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 JWT 추출
      ignoreExpiration: false, // 만료된 토큰 거부
      secretOrKey: 'taris_key', // JWT 서명 비밀키
    });
  }

  async validate(payload: any) {
    // JWT 페이로드에서 사용자 정보 반환
    return { userId: payload.userId, username: payload.username };
  }
}
