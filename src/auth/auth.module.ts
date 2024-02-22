import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { UsersModule } from "src/users/users.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UsersModule, ConfigModule],
    exports: [AuthService]
})
export class AuthModule {}