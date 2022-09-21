import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage, } from "multer";
import {extname,join} from 'path';

@Module({
  imports:[MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname,'../resource'),
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        const filename = extname(file.originalname);
        return callback(null, filename);
      }
    })
  })],
  controllers: [ResourceController],
  providers: [ResourceService]
})
export class ResourceModule {}
