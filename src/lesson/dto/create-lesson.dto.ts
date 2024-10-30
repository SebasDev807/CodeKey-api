import { IsPositive, IsString, Max, MaxLength } from "class-validator";

export class CreateLessonDto {

    @IsString()
    @MaxLength(100)
    title: string;

    @IsPositive()
    @Max(9999)
    order: string;
}
