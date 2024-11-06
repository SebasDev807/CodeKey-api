import { Injectable, Logger, HttpException, HttpStatus, InternalServerErrorException, BadRequestException, NotFoundException, } from '@nestjs/common';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DataSource, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CourseService {
  private readonly logger = new Logger('CourseService');

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    private readonly datasource: DataSource
  ) { }


  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      // Verificar si ya existe un curso con el mismo título
      const existingCourse = await this.courseRepository.findOne({
        where: { title: createCourseDto.title },
      });


      const { title } = createCourseDto;

      if (existingCourse) {
        throw new BadRequestException(`Curso con titulo '${title}' ya existe`)
      }

      const course = this.courseRepository.create(createCourseDto);
      await this.courseRepository.save(course);

      return course;

    } catch (error) {
      this.logger.error(error.message, error.stack);

      // Si es un HttpException, lo re-lanzamos tal como está
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Algo salio mal');
    }
  }


  async findAll() {
    try {
      const allCourses = await this.courseRepository.find();

      if (allCourses.length === 0) {
        throw new NotFoundException('No se encontraron cursos');
      }

      return allCourses;

    } catch (error) {
      this.logger.error(error.message, error.stack);

      throw new InternalServerErrorException('Algo salio mal.')
    }
  }


  async findOne(term: string) {

    let course: Course;


    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    course = await queryBuilder
      .leftJoinAndSelect('course.units', 'units')
      .where('course.title ILIKE :title', { title: `%${term}%` })
      .orWhere('course.id =:id', { id: !isNaN(Number(term)) ? +term : null })
      .getOne();

    if (!course) {
      throw new NotFoundException(`Curso con termino '${term}' no existe.`)
    }

    console.log(course);
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto
    });

    if (!course) {
      throw new NotFoundException(`Curso con id ${id} no existe`);
    }

    try {
      await this.courseRepository.save(course);
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      
      const course = await this.findOne(id.toString());
      
      await this.courseRepository.remove(course);
    } catch (error) {

      this.logger.error(error);
      
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAllCourses(){
    const query = this.courseRepository.createQueryBuilder('course');
    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(error);
    }
  }
}
