import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AnswerSubmitDto } from './dto/check-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/challenge/entities/challenge.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CheckAnswerService {

  private readonly logger = new Logger('CheckAnswerService')
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>
  ) { }

  async compare(answerSubmitDto: AnswerSubmitDto, challengeId: number) {

    const { charOrder } = answerSubmitDto;

    const queryBuilder = this.challengeRepository.createQueryBuilder('chall');

    try {

      const challenge = await queryBuilder
        .where('chall.id =:challengeId', {
          challengeId
        })
        .leftJoinAndSelect('chall.challengeOptions', 'options')
        .getOne();

      const { challengeOptions } = challenge;

      const option = challengeOptions.find(option => option.charOrder === charOrder);

      if (option.correct) {
        return {
          option,
          correct: true,
          message: 'Respuesta correcta!'
        }
      } else {
        return {
          option,
          correct: false,
          message: 'Respuesta incorrecta.'
        }
      }

      return challengeOptions;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went broke.')
    }
  }

}
