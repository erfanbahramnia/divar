import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Request, UseGuards } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { AddProductDto } from "../dtos/addProduct.dto";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { UserRequestData } from "src/interfaces/expresRequest.interface";
import { UpdateProductDto } from "../dtos/updateProduct.dto";
import { DeletePropertyDto } from "../dtos/deleteProperty.dto";
import { AddProductToCategoryDto } from "../dtos/addProductToCategory.dto";

@ApiTags("Product")
@Controller("/product")
export class ProductController {
    constructor(
        private readonly productService: ProductService
        ) {}
        
    @UseGuards(AuthGuard)
    @ApiBearerAuth("JWT-AUTH")
    @HttpCode(HttpStatus.CREATED)
    @Post("/add")
    @ApiOperation({description: "add new prodcut by user"})
    @ApiUnauthorizedResponse({description: "please login to your account"})
    @ApiOkResponse({description: "product added successfully"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    async addProduct(@Body() productDataDto: AddProductDto, @Request() req: UserRequestData) {
        // get user id that added new product
        const { userId } = req.user;
        // make required data for storing
        return this.productService.addProduct(productDataDto, userId)
    };

    @HttpCode(HttpStatus.OK)
    @Get("/products")
    @ApiOperation({description: "get all products"})
    @ApiOkResponse({description: "product sended successfully"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    async getProducts() {
        return await this.productService.getProducts();
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth("JWT-AUTH")
    @ApiOperation({description: "delete prodcut by user"})
    @ApiUnauthorizedResponse({description: "please login to your account"})
    @ApiOkResponse({description: "product deleted successfully"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @Get("/delete/:id")
    async deleteProductByUser(@Param("id") productId: number, @Request() req: UserRequestData) {
        // get user id
        const { userId } = req.user;
        // get delete reuslt
        return await this.productService.deleteProductByUser(productId, userId);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth("JWT-AUTH")
    @ApiOperation({description: "delete prodcut by user"})
    @ApiUnauthorizedResponse({description: "please login to your account"})
    @ApiOkResponse({description: "product deleted successfully"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @Post("/update/:id")
    async updateProductByUser(@Param("id") productId: number, @Body() updateProductDto: UpdateProductDto, @Request() req: UserRequestData) {
        // get user id
        const { userId } = req.user;
        // get delete reuslt
        return await this.productService.updateProductByUser(updateProductDto, productId, userId);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("JWT-AUTH")
    @ApiOperation({description: "delete prodcut's property by user"})
    @ApiUnauthorizedResponse({description: "please login to your account"})
    @ApiOkResponse({description: "product's properties deleted successfully"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @Post("/update-property/:productId")
    async updateProductProperty(@Param("productId", ParseIntPipe) productId: number, @Body() deletePropertyDto: DeletePropertyDto, @Request() req: UserRequestData) {
        // get user id
        const { userId } = req.user;
        // result
        return await this.productService.deleteProductProperty(deletePropertyDto, productId, userId)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("JWT-AUTH")
    @ApiOperation({description: "add product to cateogry by user"})
    @ApiUnauthorizedResponse({description: "please login to your account"})
    @ApiOkResponse({description: "product add to categories successfully"})
    @ApiNotFoundResponse({description: "not found!"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @Post("/addToCategory/:productId")
    async addProductToCategory(@Param("productId", ParseIntPipe) productId: number,@Body() addProductToCategoryDto: AddProductToCategoryDto, @Request() req: UserRequestData) {
        // get user id
        const { userId } = req.user;
        // get categories id
        const { categories } = addProductToCategoryDto
        // update product
        return await this.productService.addProductToCategory(productId, userId, categories);
    }

    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth("JWT-AUTH")
    @ApiOperation({description: "get prodcut by category"})
    @ApiUnauthorizedResponse({description: "please login to your account"})
    @ApiOkResponse({description: "product recieved successfully"})
    @ApiInternalServerErrorResponse({description: "Internal Server Error"})
    @Get("/byCatgeory/:id")
    async getCategoryProduct(@Param("id", ParseIntPipe) id: number) {
        return await this.productService.getCategoryProducts(id);
    }
}