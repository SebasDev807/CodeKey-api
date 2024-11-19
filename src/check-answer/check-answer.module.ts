import { Module } from '@nestjs/common';
import { CheckAnswerService } from './check-answer.service';
import { CheckAnswerController } from './check-answer.controller';
import { ChallengeModule } from 'src/challenge/challenge.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CheckAnswerController],
  providers: [CheckAnswerService],
  imports: [
    ChallengeModule,
    AuthModule
  ]
})
export class CheckAnswerModule { }
