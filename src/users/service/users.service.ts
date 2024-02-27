import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
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

    async findUserById(userId: number) {
      return this.userRepository.findOneBy({ userId })
    }

    async register(userData: IUserRegisterData): Promise<IUserData> {
      // check username or mobile exist or not
      const { username, mobile } = userData
      // chekc username
      const checkUsername = await this.findOne(username)
      if(checkUsername)
        throw new BadRequestException("this username has been used!")
      // chekc username
      const checkMobile = await this.findUserByMobile(mobile)
      if(checkMobile)
        throw new BadRequestException("this mobile has been used!")
      // create new user
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

    async deleteUserById(userId: number): Promise<DeleteResult> {
      // check user exist
      const user = this.findUserById(userId);
      if(!user) 
        throw new NotFoundException("User not found!");
      // delete user
      return this.userRepository.delete({userId});
    }

    async updateUserRole(userId: number, role: string): Promise<UpdateResult>  {
      // check user exist
      const user = await this.userRepository.findOneBy({ userId });
      if(!user) 
        throw new NotFoundException("User not found!");
      // update user
      const result = await this.userRepository.update({ userId }, { role })
      // return result
      return result;
    }
}