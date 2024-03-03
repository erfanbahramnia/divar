import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

export class DeletePropertyDto {
    @ApiProperty({
        isArray: true
    })
    @IsNumber({}, {each: true})
    propertiesId: number[];
}