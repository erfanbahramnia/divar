import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @IsString()
    @Length(3, 20, { message: "username length should between 3 and 20"})
    username: string;
    
    @ApiProperty()
    @IsString()
    @Length(6, 25, { message: "passowrd length should between 6 and 25"})
    password: string;
}