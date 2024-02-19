import { Module } from "@nestjs/common";
import { DeveloperController } from "./developer.controller";
import { DeveloperService } from "./developer.service";
import { UsersService } from "src/users/service/users.service";
import { UsersModule } from "src/users/users.module";

@Module({
    controllers: [DeveloperController],
    providers: [DeveloperService],
    imports: [
        UsersModule
    ]
})
export class DeveloperModule {}