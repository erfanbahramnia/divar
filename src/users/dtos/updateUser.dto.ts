import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length, Matches } from "class-validator";
import { UpdateUserData } from "../interfaces/user.interface";

export class UpdateUserDto implements UpdateUserData {
    @ApiProperty()
    @IsString()
    @Length(3, 20, { message: "username length should between 3 and 20"})
    @IsOptional()
    username?: string;

    @ApiProperty()
    @IsString()
    @Length(6, 25, { message: "passowrd length should between 6 and 25"})
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsString()
    @Length(3, 30, { message: "frist name length should between 3 and 30"})
    @IsOptional()
    first_name?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Length(3, 40, { message: "last name length should between 3 and 40"})
    last_name?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Matches(/09[0-9]{2}[0-9]{7}$/)
    mobile?: string;
}