import { Injectable, Logger, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  private readonly logger: Logger = new Logger('unitService');

  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) { }


  async create(createUnitDto: CreateUnitDto) {
    try {

      const { title } = createUnitDto;

      const existUnit = await this.unitRepository.findOne({
        where: { title },
      });

      if (existUnit) {
        throw new BadRequestException(`Unidad con el titulo ${title} ya existe.`)
      }

      const unit = this.unitRepository.create(createUnitDto);
      await this.unitRepository.save(unit);

      return unit;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }


  async findOne(term: string, course: number) {
    let unit: Unit;

    const queryBuilder = this.unitRepository.createQueryBuilder('unit');

    const order = !isNaN(Number(term)) ? Number(term) : null;

    unit = await queryBuilder
      .leftJoinAndSelect('unit.lessons', 'lesson')
      .where('(unit.title ILIKE :title OR unit.order = :order)', {
        title: `%${term}%`,
        order,
      })
      .andWhere('unit."courseId" = :course', {
        course,
      })
      .getOne();

    if (!unit) {
      throw new NotFoundException(`Unidad con el termino ${term} no existe.`);
    }

    return unit;

  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
  
    const unit = await this.unitRepository.preload({
      id,
      ...updateUnitDto
    });

    if (!unit) {
      throw new BadRequestException(`Unidad con id ${id} not existe.`)
    }

    try {

      await this.unitRepository.save(unit);

    } catch (error) {

      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }

  }


  async remove(id: number) {

    const unit = await this.unitRepository.findOneBy({ id });
 
    if (!unit) {
      throw new NotFoundException(`Unidad con id ${id} no existe`);
    }

    await this.unitRepository.remove(unit);

  }

  async deleteAllUnits(){
    const queryBuilder = this.unitRepository.createQueryBuilder();
    queryBuilder.delete()
      .where({})
      .execute();
  }

}

