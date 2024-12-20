import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        default: 10, description: 'How many rows do you need.'
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
    
    
    @ApiProperty({
        default: 0, description: 'How many rows do you want to skip.'
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset: number;
}