import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

const jwtModule = JwtModule.registerAsync({
    useFactory: () => ({
        secret: 'young',
        signOptions: {expiresIn: '2h'}
    }),
})

@Module({
    imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {
}
