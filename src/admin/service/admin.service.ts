import { Injectable } from "@nestjs/common";
import { ProductService } from "src/product/service/product.service";
import { UsersService } from "src/users/service/users.service";

@Injectable()
export class AdminService {
    constructor(
        private readonly userService: UsersService,
        private readonly productService: ProductService
    ) {}

    async deleteUserById(id: number) {
        return this.userService.deleteUserById(id)
    }

    async deleteProductByAdmin(productId: number) {
        return this.productService.deleteProductByAdmin(productId)
    }
}