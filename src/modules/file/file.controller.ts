import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import { join } from "path";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    return await this.fileService.upload(file);
  }

  @Get('export')
  export(@Res() res) {
    console.log(res);
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
