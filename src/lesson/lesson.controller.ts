import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { Auth } from 'src/auth/decorators/role-protected/auth.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post()
  @Auth(ValidRoles.ADMIN)
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get('getMany/:unit')
  @Auth(ValidRoles.USER)
  findAll(
    @Param('unit') unit: number,
    @Query() paginationDto: PaginationDto
  ) {
    console.log('Peticion');
    return this.lessonService.findAll(+unit);
  }

  @Get(':id')
  @Auth(ValidRoles.USER)
  findOne(@Param('id') id: number) {
    
    return this.lessonService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  update(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  remove(@Param('id') id: number) {
    return this.lessonService.remove(+id);
  }
}
