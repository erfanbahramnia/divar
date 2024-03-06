import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserData, IUserRegisterData, UpdateUserData } from "../interfaces/user.interface";
import { compareHashPass, generateHashPass } from "src/utils/bcrypt";

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

    async changePassword(oldPass: string, newPass: string, userId: number) {
      // get user
      const user = await this.userRepository.findOneBy({ userId })
      // get old pass hash
      const oldHashPass = await generateHashPass(oldPass, user.salt);
      // check enterd pass is valid
      if(!compareHashPass(user.password, oldHashPass)) 
        throw new BadRequestException("Entered password is not valid");
      // save new password
      const newHashPass = await generateHashPass(newPass, user.salt);
      user.password = newHashPass;
      await this.userRepository.save(user);
      // success
      return {
        status: HttpStatus.OK,
        message: "User password updated successfuly"
      };
    }
}