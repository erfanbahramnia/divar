import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { AddProductDto } from "../dtos/addProduct.dto";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { UserRequestData } from "src/interfaces/expresRequest.interface";

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
}