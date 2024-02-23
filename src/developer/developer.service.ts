import { Injectable } from "@nestjs/common";
import { IUserData } from "src/users/interfaces/user.interface";
import { UsersService } from "src/users/service/users.service";
import { UpdateResult } from "typeorm";

@Injectable()
export class DeveloperService  {
    constructor(private readonly userService: UsersService) {}

    async getUsers(): Promise<IUserData[]> {
        return await this.userService.getUsers();
    };

    async changeUserRole(id: number, role: string): Promise<UpdateResult> {
        return await this.userService.updateUserRole(id, role)
    }
}