import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository, UpdateResult } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserData, IUserRegisterData, UpdateUserData } from "../interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
      ) {}

    async findOne(username: string): Promise<IUserData | undefined> {
      // find user by username
      return await this.userRepository.findOneBy({ username })
    }

    async findUserByMobile(mobile: string): Promise<IUserData | undefined> {
      // find user by username
      return await this.userRepository.findOneBy({ mobile })
    }

    async register(userData: IUserRegisterData): Promise<IUserData> {
      const data = this.userRepository.create(userData)
      return await this.userRepository.save(data);
    }

    async getUsers(): Promise<IUserData[]> {
      return await this.userRepository.find();
    }

    async updateUser(username: string, data: UpdateUserData): Promise<UpdateResult> {
      // check user exist
      const user = this.findOne(username);
      if(!user)
          throw new NotFoundException("User not found!");
      // check new username does not exist
      if(data?.username) {
        const checkUsername = await this.findOne(data.username);
        if (checkUsername)
          throw new BadRequestException("this username has been exist");
      };
      // check new phone number does not exist
      if(data?.mobile) {
        const checkMobile = await this.findUserByMobile(data.mobile);
        if (checkMobile)
          throw new BadRequestException("this mobile has been exist");
      };
      // update user
      const updateResult = await this.userRepository.update({ username }, data);
      // return result
      return updateResult;
    }
}