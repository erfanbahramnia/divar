import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, Matches, ValidateNested } from "class-validator";

class PropertyDto {
    @ApiProperty()
    @IsString()
    key: string

    @ApiProperty()
    @IsString({ message: "value should be a string" })
    value: string
}

export class AddProductDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    @Matches(/^[0-9]+$/)
    price: string;

    @ApiProperty({
        type: [PropertyDto]
    })
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PropertyDto)
    properties: PropertyDto[];
}