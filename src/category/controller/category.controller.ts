import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "../service/category.service";

@ApiTags("Category")
@Controller("/category")
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}
}