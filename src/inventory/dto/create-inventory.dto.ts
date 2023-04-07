import { IsCurrency, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";



export class CreateInventoryDto {

    @IsNotEmpty()
    @MaxLength(40)
    @ApiProperty({example:'Plain WHite SHirt'})
    item_name:string;

    @ApiProperty({example:500})
    @IsNotEmpty()
    // @IsCurrency()
    price:number;


    @ApiPropertyOptional()
    @IsOptional()
    description?:string;


}
