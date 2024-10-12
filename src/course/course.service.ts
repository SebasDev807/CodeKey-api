import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class CourseService {
  private readonly logger = new Logger('CourseService');

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      // Verificar si ya existe un curso con el mismo título
      const existingCourse = await this.courseRepository.findOne({
        where: { title: createCourseDto.title },
      });

      if (existingCourse) {
        throw new HttpException(
          'Course with this title already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Crear y guardar el curso
      const course = this.courseRepository.create(createCourseDto);
      await this.courseRepository.save(course);

      // Retornar estado 201 (Created) y el curso creado
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Course created successfully',
        course,
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);

      // Si es un HttpException, lo re-lanzamos tal como está
      if (error instanceof HttpException) {
        throw error;
      }

      // Si es otro tipo de error, lanzamos un error 500 (Internal Server Error)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allCourses = await this.courseRepository.find();

      if (allCourses.length === 0) {
        throw new HttpException('No courses found', HttpStatus.NOT_FOUND);
      }

      // Retornar estado 200 (OK) y todos los cursos
      return {
        statusCode: HttpStatus.OK,
        message: 'Courses found',
        allCourses,
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      // Si es un HttpException, lo re-lanzamos tal como está
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const course = await this.courseRepository.findOneBy({ id });

      if (!course) {
        throw new InternalServerErrorException(
          `Course with ID ${id} not found`,
        );
      }

      return course;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
