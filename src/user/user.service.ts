import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>
  ) {}

  async create(createUser: CreateUserDto) {
    const {nickname} = createUser;
    const existUser = await this.userRepository.findOne({
      where: {nickname}
    });
    if (existUser){
      throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST);
    };
    const newUser = await this.userRepository.create(createUser);
    await this.userRepository.save(newUser);
    return await this.userRepository.findOne({ where: {nickname} });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
