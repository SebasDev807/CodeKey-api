import { IsEnum, Max, MaxLength } from "class-validator";
import { ChallengeType } from '../interfaces/challenge-type.enum';

export class CreateChallengeDto {

    @IsEnum(ChallengeType)
    challengeType: ChallengeType;

    @MaxLength(2500)
    question: string;

    @Max(9999)
    order: number;


}
