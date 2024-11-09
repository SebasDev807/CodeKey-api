import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([
      Course
    ]),
    AuthModule
  ],
  exports:[
    CourseService,
    TypeOrmModule
  ]
})
export class CourseModule { }
