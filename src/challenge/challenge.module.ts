import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { ChallengeOptions } from './entities/challenge-option.entity';
import { ChallengeProgress } from './entities/challenge-progress.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LessonModule } from 'src/lesson/lesson.module';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService],
  imports: [
    TypeOrmModule.forFeature([
      Challenge,
      ChallengeOptions,
      ChallengeProgress
    ]),
    LessonModule,
    AuthModule
  ],
  exports: [TypeOrmModule]
})
export class ChallengeModule { }
