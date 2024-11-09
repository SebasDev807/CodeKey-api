import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CourseModule } from 'src/course/course.module';
import { UnitModule } from 'src/unit/unit.module';
import { LessonModule } from 'src/lesson/lesson.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  
  imports: [
    AuthModule,
    CourseModule,
    UnitModule,
    LessonModule
  ]

})
export class SeedModule { }
