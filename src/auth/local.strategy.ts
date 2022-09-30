import {PassportStrategy} from "@nestjs/passport";
import {IStrategyOptions, Strategy} from "passport-local";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {compareSync} from "bcryptjs";


export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super({
            usernameField: 'nickname',
            passwordField: 'password',
        } as IStrategyOptions);
    }

    async validate(nickname: string, password: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.nickname=:nickname', {nickname})
            .getOne();

        if (!user) {
            throw new BadRequestException('用户名不正确');
        };

        if (!compareSync(password,user.password)){
            throw new BadRequestException('密码错误');
        };

        return user;
    }
}

