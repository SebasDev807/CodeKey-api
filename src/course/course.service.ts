import { Injectable, Logger } from '@nestjs/common';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseService {
  private readonly logger = new Logger('CourseService');

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    // return 'This action adds a new course';
    try {
      const course = await this.courseRepository.create(createCourseDto);
      await this.courseRepository.save(course);
      return course;
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
