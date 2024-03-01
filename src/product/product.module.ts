import { Module } from "@nestjs/common";
import { ProductService } from "./service/product.service";
import { ProductController } from "./controller/product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { UsersModule } from "src/users/users.module";
import { CategoryModule } from "src/category/category.module";
import { ProductPropertyEntity } from "./entities/productProperty.entity";

@Module({
    providers: [
        ProductService
    ],
    controllers: [
        ProductController
    ],
    imports: [
        // Config Modules
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductPropertyEntity
        ]),
        // App Modules
        UsersModule,
        CategoryModule,
    ],
    exports: [
        ProductService
    ]
})
export class ProductModule {};