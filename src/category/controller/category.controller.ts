import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CategoryService } from "../service/category.service";
import { AddCategoryDto } from "../dtos/addCategory.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/constants/role.enum";

@UseGuards(AuthGuard, RolesGuard)
@ApiTags("Category")
@Controller("/category")
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({description: "add category by admin"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiOkResponse({description: "Category created successfuly"})
    @ApiBadRequestResponse({description: "Bad Request"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @ApiUnauthorizedResponse({description: "Please login to your acount"})
    @Roles([Role.admin])
    @Post("/add")
    async addCategory(@Body() addCategoryDto: AddCategoryDto) {
        return await this.categoryService.addCategory(addCategoryDto)
    }
}