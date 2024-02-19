import { Injectable } from "@nestjs/common";
import { IUserData } from "src/users/interfaces/user.interface";
import { UsersService } from "src/users/service/users.service";

@Injectable()
export class DeveloperService  {
    constructor(private readonly userService: UsersService) {}

    async getUsers(): Promise<IUserData[]> {
        return this.userService.getUsers();
    };
}