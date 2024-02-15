import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @IsString()
    username: string;
    
    @ApiProperty()
    @IsString()
    password: string
}