import { PartialType } from '@nestjs/mapped-types';
import { CreatePregressChallengeDto } from './create-pregress-challenge.dto';

export class UpdatePregressChallengeDto extends PartialType(CreatePregressChallengeDto) {}
