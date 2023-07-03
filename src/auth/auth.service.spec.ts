import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { DatabaseModule } from '@root/database/database.module';
import { AuthJwtModule } from '@root/middleware/jwt/jwt.module';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal : true,
        }),
        AuthJwtModule,
        AuthModule, 
        DatabaseModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
