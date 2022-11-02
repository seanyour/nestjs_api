import { Injectable } from "@nestjs/common";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import {JwtService} from "@nestjs/jwt";
import * as svgCaptcha from "svg-captcha";

@Injectable()
export class AuthService {
  constructor(
      private jwtService: JwtService,
  ) {}

  createCaptcha(){
    return svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 30,
      background: '#f2f2f2'
    });
  }

  createToken(user) {
    return this.jwtService.sign(user);
  }

  async login(user){
    const token = this.createToken({
      id: user.id,
      nickname: user.nickname,
      role: user.role
    });
    return {...user,token};
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
