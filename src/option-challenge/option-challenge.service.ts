import { Injectable } from '@nestjs/common';
import { CreateOptionChallengeDto } from './dto/create-option-challenge.dto';
import { UpdateOptionChallengeDto } from './dto/update-option-challenge.dto';

@Injectable()
export class OptionChallengeService {
  create(createOptionChallengeDto: CreateOptionChallengeDto) {
    return 'This action adds a new optionChallenge';
  }

  findAll() {
    return `This action returns all optionChallenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionChallenge`;
  }

  update(id: number, updateOptionChallengeDto: UpdateOptionChallengeDto) {
    return `This action updates a #${id} optionChallenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionChallenge`;
  }
}
