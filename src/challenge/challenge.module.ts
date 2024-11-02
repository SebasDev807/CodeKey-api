import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { ChallengeOptions } from './entities/challenge-option.entity';
import { ChallengeProgress } from './entities/challenge-progress.entity';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService],
  imports: [
    TypeOrmModule.forFeature([
      Challenge,
      ChallengeOptions,
      ChallengeProgress
    ])
  ]
})
export class ChallengeModule { }
