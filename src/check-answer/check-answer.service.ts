import { Injectable } from '@nestjs/common';
import { CreateCheckAnswerDto } from './dto/create-check-answer.dto';
import { UpdateCheckAnswerDto } from './dto/update-check-answer.dto';

@Injectable()
export class CheckAnswerService {
  create(createCheckAnswerDto: CreateCheckAnswerDto) {
    return 'This action adds a new checkAnswer';
  }

  findAll() {
    return `This action returns all checkAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkAnswer`;
  }

  update(id: number, updateCheckAnswerDto: UpdateCheckAnswerDto) {
    return `This action updates a #${id} checkAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkAnswer`;
  }
}
