import { HttpException } from '@nestjs/common';
import  StatusCode  from '../exception.status';
export class ExistedUserException extends HttpException {
  constructor() {
    super('이미 회원가입 완료된 유저입니다..', StatusCode.get('EXISTED_USER') || 613);
  }
}