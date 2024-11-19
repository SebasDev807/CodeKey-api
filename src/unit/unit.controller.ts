import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { Auth } from '../auth/decorators/role-protected/auth.decorator';


@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) { }

  @Post()
  @Auth(ValidRoles.ADMIN)
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get('findMany/:courseId')
  findAll(
    @Param('courseId') course: number) {
    return this.unitService.findAll(course);

  }

  @Get(':term')
  findOne(@Param('term') term: string, @Query('course') course: number) {
    return this.unitService.findOne(term, +course);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  update(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(id, updateUnitDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  remove(@Param('id') id: number) {
    return this.unitService.remove(id);
  }

}
