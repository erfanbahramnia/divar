import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { AddProductDto } from "../dtos/addProduct.dto";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { UserRequestData } from "src/interfaces/expresRequest.interface";

@ApiTags("Product")
@ApiBearerAuth("JWT-AUTH")
@UseGuards(AuthGuard)
@Controller("/product")
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

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
    }
}