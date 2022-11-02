import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UnauthorizedException} from "@nestjs/common";
import {User} from "modules/user/entities/user.entity";


export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'young'
        } as StrategyOptions);
    };

    async validate(user: User){
        const existUser = await this.userRepository.findOneById(user.id);
        if (!existUser){
            throw new UnauthorizedException('token错误')
        };

        return existUser;
    }
}