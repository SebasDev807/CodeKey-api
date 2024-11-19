import { IsString, IsIn } from "class-validator";

export class AnswerSubmitDto {

    @IsString()
    @IsIn(['a','b','c','d'])
    charOrder: string;

}
