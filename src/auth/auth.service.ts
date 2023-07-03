import { Injectable } from '@nestjs/common';
import { UserRepository } from '@root/database/user/user.repository';
import { SignUpDto } from '@auth/dto/signUp.dto';
import { UserInfo } from '@root/database/user/user.entity';
import { getPolicyDto } from '@auth/dto/getPolicy.dto';
import { JwtService } from '@nestjs/jwt';
import { ExistedUserException } from '@root/middleware/exception/custom/existedUser.exception';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import { Response } from 'express';
import { SignInDto } from './dto/signIn.dto';
import { InvaildUserException } from '@root/middleware/exception/custom/invaildUser.exception';



@Injectable()
export class AuthService {

    private readonly POLICY = '회원가입 약관 : 어쩌구 저쩌구 동의합니다.'

    constructor(
        private readonly userRepository : UserRepository,
        private readonly jwtService : JwtService
    ) {}

    async getPolicy(dto:getPolicyDto) {
        const {address} = dto;
        if(await this._getUser(address)) throw new ExistedUserException();
        return {
            success : true, 
            policy : this.POLICY 
        };
    }

    async signUp(res:Response,dto:SignUpDto) {
        const {address, signature} = dto;
        if(await this._getUser(address)) throw new ExistedUserException();
        if(!this._checkSignature(address,signature)){throw new Error('invaild signature')};
        const uuid = uuidv4();
        const jwt_access_token = this._getJwtToken(dto.address);
        const user = new UserInfo(
            uuid,
            address,
            jwt_access_token
        )
        await this.userRepository.upsert(user)
    
        return this._makeRes(res,jwt_access_token);
    }

    async signIn(res:Response, dto:SignInDto) {
        const {address} = dto;
        const user = await this._getUser(address);
        if(!user) throw new InvaildUserException();
        return {
            success : true
        }
    }

   

    async _getUser(address:string) {
        return await this.userRepository.findOne(address);
    }

    _checkSignature(address:string,signature:string) : boolean {
        if(address === ethers.verifyMessage(this.POLICY,signature)) return true;
        return false;
    }

    _getJwtToken(address:string) : string {
        return this.jwtService.sign({address:address});
    }

    _refreshJwtToken(address:string) : string {
        return this._getJwtToken(address)
    }

    _makeRes(res:Response,jwt_access_token:string) {
        res.setHeader('Authorization','Bearer '+jwt_access_token).cookie('jwt',jwt_access_token,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000
        }).send({
            success : true
        })
        return res;
    }
}
