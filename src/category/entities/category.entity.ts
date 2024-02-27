import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ICategoryData } from "../interface/category.interface";
import { ProductEntity } from "src/product/entities/product.entity";

@Entity()
export class CategoryEntity implements ICategoryData {
    @Column()
    name: string;

    @PrimaryColumn("int")
    @OneToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.parentId)
    @ManyToMany(() => ProductEntity, (productEntity) => productEntity.category)
    categoryId: number;

    @Column("int")
    @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.categoryId)
    parentId: number;
}