import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { IsNull, Repository } from "typeorm";
import { AddCategoryDto } from "../dtos/addCategory.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity> 
    ) {};

    async addCategory(categoryData: AddCategoryDto) {
        // create category
        const category = this.categoryRepo.create({
            name: categoryData.name
        });

        // check new category has parent or not
        if(categoryData?.parentId) {
            // check parent exist
            const parent = await this.categoryRepo.findOne({
                where: {
                    categoryId: categoryData.parentId
                },
                relations: {
                    children: true
                }
            })
            
            if(!parent)
                throw new NotFoundException("Parent category not founded!");
            // check new category name is not same to parent name
            if(parent.name === categoryData.name)
                throw new BadRequestException("category name should not be same with parent name");
            // check parent has same child name with new category
            parent.children.map(child => {
                if(child.name === categoryData.name)
                    throw new BadRequestException("children's name of parent category should not be same!");
            }); 
            
            // make relation category with parent
            category.parent = parent;
        }
        // save category
        const result = await this.categoryRepo.save(category);
        // check category saved or not
        if(!result)
            throw new InternalServerErrorException("Could not save category!");
        // success
        return {
            status: HttpStatus.CREATED,
            category: result,
            message: "new category created successfuly"
        };
    };

    async getCategories() {
        // get all categories in form of tree
        return await this.categoryRepo.manager.getTreeRepository(CategoryEntity).findTrees()
    };

    async getCategoriesById(categoryId: number) {
        // get category
        // const parent = await this.categoryRepo.findOneBy({categoryId})
        // console.log("parent", parent);
        
        // get all categories in form of tree
        return await this.categoryRepo.manager.query(`
            WITH RECURSIVE CategoryTree AS (
                SELECT
                    name,
                    categoryId,
                    parentCategoryId
                FROM
                    category_entity
                where categoryId = ${categoryId}

                UNION ALL

                SELECT
                    category.name,
                    category.categoryId,
                    category.parentCategoryId
                FROM 
                    category_entity category
                INNER JOIN
                    CategoryTree ct ON category.parentCategoryId = ct.categoryId
            )
            SELECT categoryId FROM CategoryTree
        `)
    };

    async deleteCategory(categoryId: number) {
        // check category exist
        const category = await this.categoryRepo.findOneBy({ categoryId });
        if(!category)
            throw new NotFoundException("Could not find category!");
        // delete category
        const result = await this.categoryRepo.delete({ categoryId });
        // check delete result
        if(!result.affected)
            throw new InternalServerErrorException("Could not delete any data");
        // success
        return {
            status: HttpStatus.OK,
            message: "Category deleted successfuly"
        }
    }

    async findCategoryById(categoryId: number) {
        const category = await this.categoryRepo.findOneBy({ categoryId });
        // success
        return category;
    }

    async changeName(name: string, categoryId: number) {
        // get prodcut
        const product = await this.categoryRepo.findOneBy({ categoryId })
        // check product exist
        if(!product)
            throw new NotFoundException("Product not found!")
        // change name
        product.name = name;
        // save changes
        await this.categoryRepo.save(product)
        // success
        return {    
            status: HttpStatus.OK,
            message: "Category name updated successfuly",
            product
        };
    }
}