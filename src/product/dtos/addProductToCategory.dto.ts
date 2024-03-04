import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddProductToCategoryDto {
    @ApiProperty({
        isArray: true
    })
    @IsNumber({}, {each: true})
    categories: number[];
}