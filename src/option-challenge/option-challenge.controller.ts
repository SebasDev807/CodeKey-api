import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionChallengeService } from './option-challenge.service';
import { CreateOptionChallengeDto } from './dto/create-option-challenge.dto';
import { UpdateOptionChallengeDto } from './dto/update-option-challenge.dto';

@Controller('option-challenge')
export class OptionChallengeController {
  constructor(private readonly optionChallengeService: OptionChallengeService) {}

  @Post()
  create(@Body() createOptionChallengeDto: CreateOptionChallengeDto) {
    return this.optionChallengeService.create(createOptionChallengeDto);
  }

  @Get()
  findAll() {
    return this.optionChallengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionChallengeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionChallengeDto: UpdateOptionChallengeDto) {
    return this.optionChallengeService.update(+id, updateOptionChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionChallengeService.remove(+id);
  }
}
