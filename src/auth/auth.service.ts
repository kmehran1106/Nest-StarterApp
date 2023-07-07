import { Injectable } from '@nestjs/common';
import { ResponseMessage, SigninDto, SignupDto } from './dtos';

@Injectable()
export class AuthService {
  signin(dto: SigninDto): ResponseMessage {
    console.log(dto);
    return { message: 'Signin!' };
  }

  signup(dto: SignupDto): ResponseMessage {
    console.log(dto);
    return { message: 'Signup!' };
  }
}
