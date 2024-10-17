import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionChallengeDto } from './create-option-challenge.dto';

export class UpdateOptionChallengeDto extends PartialType(CreateOptionChallengeDto) {}
