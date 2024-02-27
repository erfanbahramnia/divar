// typerom
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
// entities
import { ProductPropertyEntity } from "./productProperty.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";
// interfaces
import { IProductDataDb } from "../interface/product.interface";

@Entity()
export class ProductEntity implements IProductDataDb {
    @Column("varchar")
    name: string

    @Column("varchar")
    description: string;

    @Column("varchar")
    price: string;

    @PrimaryGeneratedColumn()
    productId: number;
    
    @OneToMany(() => ProductPropertyEntity, (productProperty) => productProperty.productId)
    properties:ProductPropertyEntity[]

    @Column("int", { nullable: true })
    @ManyToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.categoryId)
    @JoinTable()
    category?: CategoryEntity[];

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
    user: UserEntity;
}