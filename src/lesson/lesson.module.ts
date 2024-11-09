import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UnitModule } from 'src/unit/unit.module';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [
    TypeOrmModule.forFeature([
      Lesson
    ]),
    AuthModule,
    UnitModule
  ],
  exports: [
    LessonService,
    TypeOrmModule
  ]
})
export class LessonModule { }
