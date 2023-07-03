import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { getPolicyDto } from './dto/getPolicy.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { ethers } from 'ethers';
import { DatabaseModule } from '@root/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtModule } from '@root/middleware/jwt/jwt.module';
import { AuthModule } from './auth.module';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service : AuthService
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

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Auth Test', () => {
    const mockWallet = new ethers.Wallet('14ad6876f67343ecd6fdedf7701c422be2b70fc9edd9084af2d130467e590b14');
    
    let policy
    it('getPolicy', async () => {
      const POLICY = '회원가입 약관 : 어쩌구 저쩌구 동의합니다.'
  
      const mockDto : getPolicyDto = {
        address : mockWallet.address
      }
      const getPolicy = jest.spyOn(service,'getPolicy');
      policy = await controller.getPolicy(mockDto);
      
  
      expect(getPolicy).toHaveBeenCalledWith(mockDto);
      expect(policy).toEqual(POLICY);
    });
  
    it('signUp', async () => {
      const signature = mockWallet.signMessageSync(policy);
      console.log('signature : ', signature);
      const mockDto : SignUpDto = {
        address : '0x17af5BC1a6c6Cb7cE4B8D0ff241349e7e590252d',
        signature : signature,
      }
      const signUp = jest.spyOn(service,'signUp');
      const response = await controller.signeUp(mockDto);

      expect(signUp).toHaveBeenCalledWith(mockDto);
      console.log('signUp response : ' , response);
    })
  });
});
