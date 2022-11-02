import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Like, Repository} from "typeorm";
import {hashSync} from "bcryptjs";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {};

    async create(createUserDto: CreateUserDto) {
        const {username} = createUserDto;
        const existUser = await this.userRepository.findOne({
            where: {username}
        });
        console.log(existUser)
        if (existUser) {
            throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST);
        };
        const newUser = await this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }

    async findAll(query: {keyWord: string, currentPage: number, pageSize: number}) {
        const {keyWord, currentPage, pageSize} = query;
        const records = await this.userRepository.find({
            where: {
                username: Like(`%${keyWord}%`)
            },
            skip: (currentPage - 1) * pageSize,
            take: pageSize
        });

        const total = await this.userRepository.count({
            where: {
                username: Like(`%${keyWord}%`)
            }
        });

        return {
            records,
            total
        }
    };

    async update(id: string, updateUserDto: UpdateUserDto) {
        updateUserDto.password = hashSync(updateUserDto.password);
        return await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: string) {
       return await this.userRepository.delete(id);
    }
}
