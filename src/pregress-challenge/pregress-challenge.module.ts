import { Module } from '@nestjs/common';
import { PregressChallengeService } from './pregress-challenge.service';
import { PregressChallengeController } from './pregress-challenge.controller';

@Module({
  controllers: [PregressChallengeController],
  providers: [PregressChallengeService],
})
export class PregressChallengeModule {}
