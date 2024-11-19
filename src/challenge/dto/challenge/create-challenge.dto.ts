import { IsEnum, IsInt, Max, MaxLength } from "class-validator";
import { ChallengeType } from "src/challenge/interfaces/challenge-type.enum";
import { Lesson } from "src/lesson/entities/lesson.entity";

export class CreateChallengeDto {

    @IsInt()
    id: number;

    @IsEnum(ChallengeType)
    challengeType: ChallengeType;

    @MaxLength(2500)
    question: string;

    @IsInt()
    lesson: Lesson;

    @Max(9999)
    order: number;


}
