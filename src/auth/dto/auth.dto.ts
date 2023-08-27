import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface RequestUserDto {
  email: string;
  id: number;
}

export interface ResponseMessageDto {
  message: string;
}

export interface SignupResponseDto {
  id: number;
  email: string;
}

export interface SigninResponseDto {
  access_token: string;
  refresh_token: string;
}
