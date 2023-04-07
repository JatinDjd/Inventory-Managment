import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {


    @IsOptional()
    @IsNotEmpty()
    item_name?: string;

    @IsOptional()
    @IsNotEmpty()
    price?: number;


    @IsOptional()
    description?: string;
}


