import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/challenge/create-challenge.dto';
import { UpdateChallengeDto } from './dto/challenge/update-challenge.dto';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { ChallengeOptions } from './entities/challenge-option.entity';
import { CreateChallengeOptionDto } from './dto/challenge-options/create-challenge-option.dto';

@Injectable()
export class ChallengeService {

  private logger = new Logger('ChallengeService');

  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    @InjectRepository(ChallengeOptions)
    private readonly challengeOptionsRepository: Repository<ChallengeOptions>

  ) { }


  async createChallenge(createChallengeDto: CreateChallengeDto) {

    const { lesson } = createChallengeDto;

    const existLesson = await this.lessonRepository.findOneBy({ id: +lesson });

    if (!existLesson) {
      throw new NotFoundException(`Lesson with id ${lesson} not found.`);
    }

    const challenge = await this.challengeRepository.create(createChallengeDto);
    await this.challengeRepository.save(challenge);

    return challenge;

  }

  async findAll(lessonId: number) {
    const queryBuilder = this.challengeRepository.createQueryBuilder('chall');

    try {
      const challenges = await queryBuilder
        .where('chall.lessonId =:lessonId', {
          lessonId
        })
        .getMany()
      return challenges;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Algo salio mal.')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  async createChallengeOption(createChallengeOptionDto: CreateChallengeOptionDto) {

    const { challenge } = createChallengeOptionDto;

    const existChallenge = await this.challengeRepository.findOneBy({ id: +challenge });

    if (!existChallenge) {
      throw new NotFoundException(`Lesson with id ${challenge} not found.`);
    }

    const challengeOption = await this.challengeOptionsRepository
      .create(createChallengeOptionDto);
    await this.challengeOptionsRepository.save(challengeOption);

    return challenge;
  }



}
