import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './modules/user/user.module';
import {AuthModule} from './modules/auth/auth.module';
import {FileModule} from './modules/file/file.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import config from "../config/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('db.host'),
                port: configService.get('db.port'),
                username: configService.get('db.username'),
                password: configService.get('db.password'),
                database: configService.get('db.database'),
                autoLoadEntities: true,
                synchronize: true,
                retryDelay: 500,
                retryAttempts: 10,
            })
        }),
        UserModule,
        AuthModule,
        FileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
};
