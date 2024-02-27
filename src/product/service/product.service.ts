import { HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductEntity } from "../entities/product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "src/category/service/category.service";
import { ProductPropertyEntity } from "../entities/productProperty.entity";
import { UsersService } from "src/users/service/users.service";
import { Property } from "../interface/product.interface";
import { AddProductDto } from "../dtos/addProduct.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
        @InjectRepository(ProductPropertyEntity) private productPropertyRepo: Repository<ProductPropertyEntity>,
        private readonly categoryService: CategoryService,
        private readonly userService: UsersService
    ) {};

    // add product by user
    async addProduct(productData: AddProductDto, userId: number) {
        // create product
        const product = this.productRepo.create({
            name: productData.name,
            description: productData.description,
            price: productData.price
        }) 
        
        // get propeties of product
        const { properties } = productData;
        // save properties
        properties.map(async (property: Property) => {
            const prop = this.productPropertyRepo.create({
                key: property.key,
                value: property.value
            });
            // make relation with product entity
            prop.productId = product
            // save to db
            await this.productPropertyRepo.save(prop)
        })

        // get user info
        const user = await this.userService.findUserById(userId)
        // make relation with user entity
        product.user = user

        // save data
        const result = await this.productRepo.save(product);
        if(result)
            return {
                message: "product added succefuly",
                statusCode: HttpStatus.CREATED
            }
        // unsuccesful
        throw new InternalServerErrorException("Internal Server Error");
    }

    // get all products
    async getProducts() {
       return await this.productRepo
            .createQueryBuilder("ProductEntity")
            .leftJoin("ProductEntity.user", "UserEntity")
            .leftJoin("ProductEntity.properties", "ProductPropertyEntity")
            .addSelect(["UserEntity.username"])
            .addSelect(["ProductPropertyEntity.key", "ProductPropertyEntity.value"])
            .getMany()
    }
}