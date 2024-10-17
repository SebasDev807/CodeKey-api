import { Injectable } from '@nestjs/common';
import { CreatePregressChallengeDto } from './dto/create-pregress-challenge.dto';
import { UpdatePregressChallengeDto } from './dto/update-pregress-challenge.dto';

@Injectable()
export class PregressChallengeService {
  create(createPregressChallengeDto: CreatePregressChallengeDto) {
    return 'This action adds a new pregressChallenge';
  }

  findAll() {
    return `This action returns all pregressChallenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pregressChallenge`;
  }

  update(id: number, updatePregressChallengeDto: UpdatePregressChallengeDto) {
    return `This action updates a #${id} pregressChallenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} pregressChallenge`;
  }
}
