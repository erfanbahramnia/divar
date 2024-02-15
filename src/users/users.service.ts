import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IUser } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async findOne(username: string): Promise<IUser | undefined> {
      // find user by username
      return await this.userRepository.findOneBy({ username })
    }
}