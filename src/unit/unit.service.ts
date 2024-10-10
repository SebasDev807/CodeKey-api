import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  private readonly logger: Logger = new Logger();

  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  /*
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
    */

  async create(createUnitDto: CreateUnitDto) {
    try {
      // Verificar si ya existe un curso con el mismo título
      const existUnit = await this.unitRepository.findOne({
        where: { title: createUnitDto.title },
      });

      if (existUnit)
        throw new HttpException(
          'Uniti title already exist.',
          HttpStatus.BAD_REQUEST,
        );

      // Crear y guardar el curso
      const unity = this.unitRepository.create(createUnitDto);
      await this.unitRepository.save(unity);

      // Retornar estado 201 (Created) y el curso creado
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Course created successfully',
        unity,
      };
    } catch (error) {}
  }

  findAll() {
    return `This action returns all unit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unit`;
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
