import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    Query,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @ApiQuery({name: 'keyWord'})
    @ApiQuery({name: 'currentPage'})
    @ApiQuery({name: 'pageSize'})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(@Query() query: { keyWord: string, currentPage: number, pageSize: number }) {
        return this.userService.findAll(query);
    };

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
