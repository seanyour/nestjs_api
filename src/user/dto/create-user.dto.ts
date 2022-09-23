export class CreateUserDto {
    id: string;

    nickname: string;

    password: string;

    isActive: boolean;

    createTime: string;

    updateTime?: string;
}
