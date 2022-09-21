import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [UserModule, AuthModule, ResourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
