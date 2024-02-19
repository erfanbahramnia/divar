import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserData, IUserRegisterData } from "../interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async findOne(username: string): Promise<IUserData | undefined> {
      // find user by username
      return await this.userRepository.findOneBy({ username })
    }

    async register(userData: IUserRegisterData): Promise<IUserData> {
      const data = this.userRepository.create(userData)
      return await this.userRepository.save(data);
    }

    async getUsers(): Promise<IUserData[]> {
      return await this.userRepository.find();
    }
}