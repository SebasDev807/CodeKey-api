import { Module } from '@nestjs/common';
import { CheckAnswerService } from './check-answer.service';
import { CheckAnswerController } from './check-answer.controller';

@Module({
  controllers: [CheckAnswerController],
  providers: [CheckAnswerService],
})
export class CheckAnswerModule {}
