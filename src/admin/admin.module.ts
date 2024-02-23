import { Module } from "@nestjs/common";
import { AdminController } from "./controller/admin.controller";
import { UsersModule } from "src/users/users.module";
import { AdminService } from "./service/admin.service";

@Module({
    controllers: [AdminController],
    providers: [ AdminService ],
    imports: [UsersModule]
})
export class AdminModule {};