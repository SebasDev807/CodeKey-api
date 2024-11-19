import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckAnswerService } from './check-answer.service';
import { CreateCheckAnswerDto } from './dto/create-check-answer.dto';
import { UpdateCheckAnswerDto } from './dto/update-check-answer.dto';

@Controller('check-answer')
export class CheckAnswerController {
  constructor(private readonly checkAnswerService: CheckAnswerService) {}

  @Post()
  create(@Body() createCheckAnswerDto: CreateCheckAnswerDto) {
    return this.checkAnswerService.create(createCheckAnswerDto);
  }

  @Get()
  findAll() {
    return this.checkAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckAnswerDto: UpdateCheckAnswerDto) {
    return this.checkAnswerService.update(+id, updateCheckAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkAnswerService.remove(+id);
  }
}
