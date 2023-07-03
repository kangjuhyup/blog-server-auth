import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
    });
  }
}