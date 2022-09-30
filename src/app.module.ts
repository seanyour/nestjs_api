import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TypeOrmCoreModule} from "@nestjs/typeorm/dist/typeorm-core.module";
import { FileModule } from './file/file.module';

@Module({
    imports: [
        TypeOrmCoreModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'nestjs',
            autoLoadEntities: true,
            synchronize: false
        }),
        UserModule,
        AuthModule,
        FileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {};
