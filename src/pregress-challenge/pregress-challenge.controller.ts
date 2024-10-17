import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PregressChallengeService } from './pregress-challenge.service';
import { CreatePregressChallengeDto } from './dto/create-pregress-challenge.dto';
import { UpdatePregressChallengeDto } from './dto/update-pregress-challenge.dto';

@Controller('pregress-challenge')
export class PregressChallengeController {
  constructor(private readonly pregressChallengeService: PregressChallengeService) {}

  @Post()
  create(@Body() createPregressChallengeDto: CreatePregressChallengeDto) {
    return this.pregressChallengeService.create(createPregressChallengeDto);
  }

  @Get()
  findAll() {
    return this.pregressChallengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pregressChallengeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePregressChallengeDto: UpdatePregressChallengeDto) {
    return this.pregressChallengeService.update(+id, updatePregressChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pregressChallengeService.remove(+id);
  }
}
