import { Module } from "@nestjs/common";
import { AdminController } from "./controller/admin.controller";
import { UsersModule } from "src/users/users.module";
import { AdminService } from "./service/admin.service";
import { ProductModule } from "src/product/product.module";

@Module({
    controllers: [AdminController],
    providers: [ AdminService ],
    imports: [
        UsersModule,
        ProductModule
    ]
})
export class AdminModule {};