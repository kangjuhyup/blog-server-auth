import { Bind, Body, Controller, Get, Inject, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignUpDto } from '@auth/dto/signUp.dto';
import { getPolicyDto } from './dto/getPolicy.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SetInfoDto } from './dto/setInfo.dto';
import { JwtGuard } from '@root/middleware/jwt/jwt.guard';
import { Response } from 'express';
import { SignInDto } from './dto/signIn.dto';
import { GetInfoDto } from './dto/getInfo.dto';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('KAFKA') private readonly producer: ClientKafka,
        private readonly authService: AuthService,
    ) {}    


    @MessagePattern('getPolicy')
    async getPolicy(
        @Query() dto: getPolicyDto
    ) {
        return this.authService.getPolicy(dto);
    }

    @Post('signUp')
    async signeUp(
        @Res() res:Response,
        @Body() dto:SignUpDto
    ) {
        return this.authService.signUp(res,dto);
    }

    @Post('signIn')
    async signIn(
        @Res() res:Response,
        @Body() dto:SignInDto
    ) {
        return this.authService.signIn(res,dto);
    }

}
