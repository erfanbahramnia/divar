import { Module } from "@nestjs/common";
import { CategoryController } from "./controller/category.controller";
import { CategoryService } from "./service/category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";

@Module({
    controllers: [
        CategoryController
    ],
    providers: [
        CategoryService
    ],
    imports: [
        // Config Modules
        TypeOrmModule.forFeature([
            CategoryEntity
        ])
    ],
    exports: [
        CategoryService
    ]
})
export class CategoryModule {};