import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChnagePasswordDto {
    @ApiProperty()
    @IsString()
    oldPassword: string;

    @ApiProperty()
    @IsString()
    newPassword: string;
};