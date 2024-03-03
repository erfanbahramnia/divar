import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryData {
    name: string;
    categoryId: number;
    parent: CategoryEntity;
}