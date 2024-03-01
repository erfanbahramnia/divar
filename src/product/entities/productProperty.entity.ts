import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity()
export class ProductPropertyEntity {
    @Column("varchar")    
    key: string;

    @Column("varchar")    
    value: string;

    @ManyToOne(() => ProductEntity, (productEntity) => productEntity.productId, {
        onDelete: "CASCADE"
    })
    productId: ProductEntity;

    @PrimaryGeneratedColumn()
    id: number
}