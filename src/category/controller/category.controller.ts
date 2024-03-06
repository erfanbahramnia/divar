import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CategoryService } from "../service/category.service";
import { AddCategoryDto } from "../dtos/addCategory.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/constants/role.enum";

@ApiTags("Category")
@Controller("/category")
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
        ) {}
        
    @UseGuards(AuthGuard, RolesGuard)
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
    };

    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({description: "delete category by admin"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiOkResponse({description: "Category deleted successfuly"})
    @ApiBadRequestResponse({description: "Bad Request"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @ApiUnauthorizedResponse({description: "Please login to your acount"})
    @Roles([Role.admin])
    @Post("/delete/:id")
    async deleteCategory(@Param("id", ParseIntPipe) id: number) {
        return await this.categoryService.deleteCategory(id);
    };

    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({description: "get all categories"})
    @ApiOkResponse({description: "Category received successfuly"})
    @ApiBadRequestResponse({description: "Bad Request"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @ApiUnauthorizedResponse({description: "Please login to your acount"})
    @Get("/categories")
    async getCategories() {
        return this.categoryService.getCategories()
    };

    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({description: "change category name by admin"})
    @ApiBearerAuth("JWT-AUTH")
    @ApiOkResponse({description: "Category name updated successfuly"})
    @ApiBadRequestResponse({description: "Bad Request"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @ApiUnauthorizedResponse({description: "Please login to your acount"})
    @Roles([Role.admin])
    @Get("/changeName/:name/:id")
    async changeCateogryName(@Param("id", ParseIntPipe) id: number, @Param("name") name: string) {
        return this.categoryService.changeName(name, id);
    };
}