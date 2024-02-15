import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interfaces/user.interface";

@Entity()
export class UserEntity implements IUser {
    @Column("varchar", {unique: true})
    username: string;

    @Column("varchar")
    password: string;

    @Column("varchar")
    first_name: string;

    @Column("varchar")
    last_name: string;

    @Column("int", {unique: true})
    mobile: number;

    @Column("varchar")
    salt: string;

    @PrimaryGeneratedColumn()
    userId: number;
}