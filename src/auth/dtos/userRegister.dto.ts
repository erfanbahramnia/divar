// inject
import { Injectable } from "@nestjs/common";
// swagger
import { ApiProperty } from "@nestjs/swagger";
// validation
import { IsNumber, IsString, Length, Matches } from "class-validator";

@Injectable()
export class UserRegisterDto {
    @ApiProperty()
    @IsString()
    @Length(3, 20, { message: "username length should between 3 and 20"})
    username: string;

    @ApiProperty()
    @IsString()
    @Length(3, 30, { message: "frist name length should between 3 and 30"})
    first_name: string;

    @ApiProperty()
    @IsString()
    @Length(3, 40, { message: "last name length should between 3 and 40"})
    last_name: string;

    @ApiProperty()
    @IsString()
    @Length(6, 25, { message: "passowrd length should between 6 and 25"})
    password: string;

    @ApiProperty()
    @IsString()
    @Matches(/09[0-9]{2}[0-9]{7}$/)
    mobile: string;
}