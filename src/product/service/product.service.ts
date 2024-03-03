import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "../entities/product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "src/category/service/category.service";
import { ProductPropertyEntity } from "../entities/productProperty.entity";
import { UsersService } from "src/users/service/users.service";
import { Property } from "../interface/product.interface";
import { AddProductDto } from "../dtos/addProduct.dto";
import { UpdateProductDto } from "../dtos/updateProduct.dto";
import { objectValueValidator } from "src/utils/objectValidation";
import { DeletePropertyDto } from "../dtos/deleteProperty.dto";

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
    };

    // get all products
    async getProducts() {
       return await this.productRepo
            .createQueryBuilder("ProductEntity")
            .leftJoin("ProductEntity.user", "UserEntity")
            .leftJoin("ProductEntity.properties", "ProductPropertyEntity")
            .addSelect(["UserEntity.username"])
            .addSelect(["ProductPropertyEntity.key", "ProductPropertyEntity.value", "ProductPropertyEntity.id"])
            .getMany()
    };

    // delete product by user(user own product)
    async deleteProductByUser(productId: number, userId: number) {
        // check product exist
        const result = await this.productRepo
            .createQueryBuilder("ProductEntity")
            .addSelect(["ProductEntity.productId"])
            .leftJoin("ProductEntity.user", "UserEntity")
            .where("productId = :productId", { productId })
            .andWhere("UserEntity.userId = :userId", { userId })
            .getOne()        
        
        // if product not found => throw error
        if(!result)
            throw new NotFoundException("product not found!");

        // get product id
        const id = result.productId
        // delete product
        const res = await this.productRepo.delete({ productId: id })
        // check product deleted or not
        if(!res.affected) 
            throw new InternalServerErrorException("could not delete product");
        // success
        return {
            status: HttpStatus.OK,
            message: "product deleted sucessfuly"
        };
    };

    // delete product by admin(higher access)
    async deleteProductByAdmin(productId: number) {
        // check product exist
        const product = await this.productRepo.findOneBy({productId});
        if(!product) 
            throw new NotFoundException("Product not found!")
        // delete product
        const result = await this.productRepo.delete({productId});
        // check product deleted or not
        if(!result.affected)
            throw new InternalServerErrorException("Product did not deleted!")
        // success
        return {
            status: HttpStatus.OK,
            message: "product deleted succesfuly"
        };
    };

    async updateProductByUser(data: UpdateProductDto, productId: number, userId: number) {
        // validate data
        const validateData = objectValueValidator(data)
        // check product exist
        const product = await this.productRepo
            .createQueryBuilder("ProductEntity")
            .leftJoin("ProductEntity.user", "UserEntity")
            .where("ProductEntity.productId = :productId", { productId })
            .andWhere("UserEntity.userId = :userId", { userId })
            .getOne()
        if(!product)
            throw new NotFoundException("Product not found!");
        // check user add property for product or not
        if(validateData?.properties) {
            // make reference each property to product 
            validateData.properties.map(async(property) => {
                const newProp = this.productPropertyRepo.create({
                    key: property.key,
                    value: property.value,
                })
                newProp.productId = product;
                await this.productPropertyRepo.save(newProp);
            });
        };
        // get data of product that valid for update
        delete validateData?.properties;
        // update product
        const updateResult = await this.productRepo.update({productId}, validateData)
        // check validateData updated or not
        if(!updateResult.affected) 
            throw new InternalServerErrorException("Did not update product data!");
        // success
        const newProduct = await this.productRepo
            .createQueryBuilder("ProductEntity")
            .leftJoin("ProductEntity.properties", "ProductPropertyEntity")
            .leftJoin("ProductEntity.user", "UserEntity")
            .addSelect(["UserEntity.username"])
            .addSelect(["ProductPropertyEntity.key", "ProductPropertyEntity.value"])
            .where("ProductEntity.productId = :productId", { productId })
            .getOne();
        // success 
        return {
            newProduct,
            status: HttpStatus.OK,
            message: "Product updated successfuly"
        };
    };

    async deleteProductProperty(properties: DeletePropertyDto, productId: number, userId: number) {
        // check propeties id is not empty
        if(!properties)
            throw new BadRequestException("Request is not valid!");
        // covert array of properties id to set of properties id
        const setProperties = new Set(properties.propertiesId);
        // check sended properties is belong to product or not
        const product = await this.productRepo
            .createQueryBuilder("ProductEntity")
            .leftJoin("ProductEntity.properties", "ProductPropertyEntity")
            .leftJoin("ProductEntity.user", "UserEntity")
            .addSelect(["ProductPropertyEntity.id"])
            .where("ProductEntity.productId = :productId", { productId })
            .andWhere("UserEntity.userId = :userId", { userId })
            .getOne();
        // check product exist
        if(!product)
            throw new NotFoundException("Product not found!");
        // get ids of properties that belong to product
        const propertyIds = product.properties.map(prop => prop.id);
        // check ids that sended is valid or not
        setProperties.forEach(id => {
            if(!propertyIds.includes(id)) throw new BadRequestException("Propety does not exist!");
        });
        // delete propeties
        const result = await this.productPropertyRepo.delete(Array.from(setProperties))
        // check delete result
        if(!result.affected)
            throw new InternalServerErrorException("couldn't delete any property")
        // success
        return {
            status: HttpStatus.OK,
            message: "properties deleted successfuly"
        }
    };
}