import { IsPositive, IsString, Max, MaxLength, MinLength, IsInt } from "class-validator";
import { Unit } from "src/unit/entities/unit.entity";

export class CreateLessonDto {

    @IsString()
    @MaxLength(100)
    title: string;

    @IsString()
    code: string;

    @IsPositive()
    @Max(9999)
    order: number;

    @MinLength(200)
    @MaxLength(2000)
    text:string;

    @IsInt()
    unit:Unit;
}
