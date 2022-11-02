import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    id: string;

    @ApiProperty({required: true})
    username: string;

    @ApiProperty({required: true})
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
