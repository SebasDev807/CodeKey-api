import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/challenge/create-challenge.dto';
import { UpdateChallengeDto } from './dto/challenge/update-challenge.dto';
import { Auth } from 'src/auth/decorators/role-protected/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { CreateChallengeOptionDto } from './dto/challenge-options/create-challenge-option.dto';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) { }

  //http://local/api/v1/challenge - POST
  @Post()
  @Auth(ValidRoles.ADMIN)
  createChallenge(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.createChallenge(createChallengeDto);
  }

  @Post('option')
  @Auth(ValidRoles.ADMIN)
  createOption(@Body() createChallengeoption:CreateChallengeOptionDto){
    return this.challengeService.createChallengeOption(createChallengeoption);
  }

  @Get()
  findAll(@Query('lessonId') lessonId: string) {
    return this.challengeService.findAll(+lessonId);
  }

  @Get(':id')
  @Auth(ValidRoles.USER)
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(+id);
  }




  
}
