import { Module } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UsersController } from "./controller/users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}