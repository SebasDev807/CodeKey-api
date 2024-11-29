import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/unit/entities/unit.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';


@Injectable()
export class LessonService {

  private readonly logger = new Logger('LessonsService');

  constructor(

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>

  ) { }

  async create(createLessonDto: CreateLessonDto) {

    const { unit } = createLessonDto;

    const existUnit = await this.unitRepository.findOneBy({ id: +unit });

    if (!existUnit) {
      throw new NotFoundException(`Unit with id ${unit} not found`);
    }

    const lesson = this.lessonRepository.create(createLessonDto);
    await this.lessonRepository.save(lesson);

    return lesson;

  }

  async findAll(unit: number) {

    try {

      const queryBuilder = this.lessonRepository.createQueryBuilder('lesson');

      const lessons = await queryBuilder
        .where('lesson.unitId =:unit', {
          unit
        })
        .leftJoinAndSelect('lesson.challenges', 'challenges')
        .leftJoinAndSelect('challenges.challengeOptions', 'options')
        .orderBy('options.charOrder', 'ASC')
        .getMany();

      return lessons;

    } catch (error) {

      this.logger.error(error);
      throw new InternalServerErrorException('Algo salio mal.');
    }
  }


  async deleteAllLessons() {
    const queryBuilder = this.lessonRepository.createQueryBuilder();
    queryBuilder.delete()
      .where({})
      .execute();
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }

}

