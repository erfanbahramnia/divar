import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { ICategoryData } from "../interface/category.interface";
import { ProductEntity } from "src/product/entities/product.entity";

@Entity()
@Tree("nested-set")
export class CategoryEntity implements ICategoryData {
    @Column("varchar")
    name: string;

    @PrimaryGeneratedColumn()
    categoryId: number;
    
    @TreeChildren()
    children: CategoryEntity[];
    
    @ManyToMany(() => ProductEntity, (productEntity) => productEntity.category)
    @JoinTable()
    products: ProductEntity[];

    @TreeParent({ onDelete: 'CASCADE' })
    parent: CategoryEntity;
}