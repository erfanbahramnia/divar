import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeletePropertyDto {
    @ApiProperty({
        isArray: true
    })
    @IsNumber({}, {each: true})
    propertiesId: number[];
}