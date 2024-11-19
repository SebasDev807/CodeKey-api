import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CheckAnswerService } from './check-answer.service';
import { AnswerSubmitDto } from './dto/check-answer.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { Auth } from '../auth/decorators/role-protected/auth.decorator';

@Controller('check-answer')
export class CheckAnswerController {
  constructor(private readonly checkAnswerService: CheckAnswerService) { }

  @Post('compare')
  @Auth(ValidRoles.USER)
  compare(
    @Body() answerSubmit: AnswerSubmitDto,
    @Query('challenge') challengeId: number
  ) {
    return this.checkAnswerService.compare(answerSubmit, challengeId);
  }

}
