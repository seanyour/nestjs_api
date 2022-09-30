import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Session, UseGuards, UseInterceptors, ClassSerializerInterceptor} from "@nestjs/common";
import {AuthService} from './auth.service';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: '创建验证码'})
    @Get('captcha')
    createCaptcha(@Req() req, @Res() res, @Session() session) {
        const captcha = this.authService.createCaptcha();
        session.captcha = captcha.text;
        res.type('image/svg+xml');
        res.send(captcha.data);
    }

    @ApiOperation({summary: '验证验证码'})
    @Post('verifyCaptcha')
    verifyCaptcha(@Session() session, @Body() body) {
        console.log(session, body);
        if (session.captcha.toLocaleLowerCase() === body?.captcha?.toLocaleLowerCase()) {
            return {
                status: 200,
                message: '验证码正确'
            }
        } else {
            return {
                status: 400,
                message: '验证码正确'
            }
        }
    }

    @ApiOperation({summary: '登录'})
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req) {
        return req.user;
    }

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
