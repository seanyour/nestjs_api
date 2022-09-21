import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Session } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('captcha')
  @ApiOperation({
    summary: '创建验证码'
  })
  createCaptcha(@Req() req,@Res() res,@Session() session){
    const captcha = this.authService.createCaptcha();
    session.captcha = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('verifyCaptcha')
  @ApiOperation({
    summary: '验证验证码'
  })
  verifyCaptcha(@Session() session, @Body() body){
    console.log(session,body);
    if (session.captcha.toLocaleLowerCase() === body?.captcha?.toLocaleLowerCase()){
      return {
        status: 200,
        message: '验证码正确'
      }
    }else {
      return {
        status: 400,
        message: '验证码正确'
      }
    }
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
