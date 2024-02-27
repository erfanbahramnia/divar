import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUserData } from "../interfaces/user.interface";
import { Role } from "src/constants/role.enum";
import { ProductEntity } from "src/product/entities/product.entity";

@Entity()
export class UserEntity implements IUserData {
    @Column("varchar", {unique: true})
    username: string;

    @Column("varchar")
    password: string;

    @Column("varchar", {default: Role.user})
    role: string;

    @Column("varchar")
    first_name: string;

    @Column("varchar")
    last_name: string;

    @Column("varchar", {unique: true})
    mobile: string;

    @Column("varchar")
    salt: string;

    @OneToMany(() => ProductEntity, (productEntity) => productEntity.user)
    products: ProductEntity[]; 

    @PrimaryGeneratedColumn()
    userId: number;
}