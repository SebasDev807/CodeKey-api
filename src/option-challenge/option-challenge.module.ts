import { Module } from '@nestjs/common';
import { OptionChallengeService } from './option-challenge.service';
import { OptionChallengeController } from './option-challenge.controller';

@Module({
  controllers: [OptionChallengeController],
  providers: [OptionChallengeService],
})
export class OptionChallengeModule {}
