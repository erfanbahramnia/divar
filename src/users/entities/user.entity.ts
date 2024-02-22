import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUserData } from "../interfaces/user.interface";
import { Role } from "src/constants/role.enum";

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

    @PrimaryGeneratedColumn()
    userId: number;
}