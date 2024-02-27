import { CategoryEntity } from "src/category/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";

export type Property = {
    key: string,
    value: string
}

export interface IProductData {
    name: string;
    price: string;
    description: string;
    properties?: Property[]; 
    category?: CategoryEntity[];
    user: UserEntity;
}

export interface IProductDataDb extends IProductData {
    productId: number;
}