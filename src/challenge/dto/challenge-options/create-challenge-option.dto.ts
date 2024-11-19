import { IsBoolean, IsEnum, IsIn, IsInt, IsString, Max, MaxLength } from "class-validator";
import { ChallengeType } from "src/challenge/interfaces/challenge-type.enum";
import { Challenge } from '../../entities/challenge.entity';

export class CreateChallengeOptionDto {


    @IsString()
    text: string;

    @IsBoolean()
    correct: boolean;

    @IsString()
    @IsIn(['a', 'b', 'c', 'd'])
    charOrder: string;

    @IsInt()
    challenge: Challenge;

}
