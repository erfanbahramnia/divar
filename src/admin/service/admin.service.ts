import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/service/users.service";

@Injectable()
export class AdminService {
    constructor(
        private readonly userService: UsersService
    ) {}

    async deleteUserById(id: number) {
        return this.userService.deleteUserById(id)
    }
}