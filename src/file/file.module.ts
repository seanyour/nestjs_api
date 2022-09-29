import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {join,extname} from "path";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../resource'),
        filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null,fileName);
        }
      })
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
