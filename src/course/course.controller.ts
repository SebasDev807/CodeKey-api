import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CourseService } from './course.service';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Auth } from 'src/auth/decorators/role-protected/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @ApiResponse({ status: 201, description: 'Course created', type: Course })
  @ApiResponse({ status: 403, description: 'Invalid roles' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth()
  @Post()
  @Auth(ValidRoles.ADMIN)
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @ApiResponse({ status: 200, description: 'Get all courses paginated' })
  @ApiResponse({ status: 404, description: 'No courses found' })
  @Get()
  findAll() {
    return this.courseService.findAll();
  }


  @ApiParam({ name: 'term', description: 'search term' })
  @ApiResponse({ status: 404, description: 'Course with your term not found' })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.courseService.findOne(term);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Course Updated' })
  @ApiResponse({ status: 403, description: 'Invalid user roles' })
  @ApiResponse({ status: 404, description: 'Course not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({ name: 'id', description: 'Id to search course' })
  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Course Deleted' })
  @ApiResponse({ status: 403, description: 'Invalid roles' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Id to search course' })
  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
