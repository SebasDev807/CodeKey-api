import { PartialType } from '@nestjs/swagger';
import { CreateCheckAnswerDto } from './create-check-answer.dto';

export class UpdateCheckAnswerDto extends PartialType(CreateCheckAnswerDto) {}
