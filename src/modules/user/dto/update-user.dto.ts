import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    email: string;

    @ApiProperty({enum: ['root','admin','user']})
    role: string
}
