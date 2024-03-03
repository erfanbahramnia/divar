import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ICategoryData } from "../interface/category.interface";
import { ProductEntity } from "src/product/entities/product.entity";

@Entity()
export class CategoryEntity implements ICategoryData {
    @Column("varchar")
    name: string;

    @PrimaryGeneratedColumn()
    categoryId: number;
    
    @OneToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.parent)
    children: CategoryEntity[];
    
    @ManyToMany(() => ProductEntity, (productEntity) => productEntity.category)
    @JoinTable()
    products: ProductEntity[];

    @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.categoryId)
    parent: CategoryEntity;
}