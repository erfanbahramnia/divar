import { PartialType } from "@nestjs/swagger";
import { AddProductDto, PropertyDto } from "./addProduct.dto";

export class UpdateProductDto extends PartialType(AddProductDto) {}