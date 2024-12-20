import { Injectable, Logger } from '@nestjs/common';
import { seedData } from './data/seed-data';
import { AuthService } from '../auth/auth.service';
import { CourseService } from '../course/course.service';
import { UnitService } from 'src/unit/unit.service';
import { LessonService } from '../lesson/lesson.service';
import { User } from 'src/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';

@Injectable()
export class SeedService {

  private readonly logger = new Logger('seed');

  constructor(
    private readonly authService: AuthService,
    private readonly courseService: CourseService,
    private readonly unitService: UnitService,
    private readonly lessonService: LessonService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,


  ) { }

  async executeSeed() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertCourses();
    await this.insertUnits();
    await this.insertLessons();
    return 'Seed executed';
  }

  private async insertUsers() {
    const seedUsers = seedData.users;
    const users: User[] = [];
    seedUsers.forEach(user => users.push(this.userRepository.create(user)));

    await this.userRepository.save(users);

  }


  private async insertCourses() {
    const seedCourses = seedData.courses;
    const courses: Course[] = [];

    seedCourses.forEach(course => {
      courses.push(this.courseRepository.create(course));
    });

    await this.courseRepository.save(courses);

  }




  private async insertUnits() {
    const seedUnits = seedData.units;
    const units: Unit[] = [];

    for (const unit of seedUnits) {

      const course = await this.courseRepository.findOneBy({ id: unit.course });

      const unitEntity = this.unitRepository.create({
        ...unit,
        course: course,
      });

      units.push(unitEntity);
    }

    await this.unitRepository.save(units);

  }


  private async insertLessons() {

    const seedLesson = seedData.lessons;
    const lessons: Lesson[] = [];

    for (const lesson of seedLesson) {

      const unit = await this.unitRepository.findOneBy({ id: lesson.unit });

      const lessonEntity = this.lessonRepository.create({
        ...lesson,
        unit
      });

      lessons.push(lessonEntity);
    }

    await this.lessonRepository.save(lessons);

  }


  private async deleteTables() {
    const promises = [
      this.authService.deleteAllUsers(),
      this.courseService.deleteAllCourses(),
      this.unitService.deleteAllUnits(),
      this.lessonService.deleteAllLessons()
    ];
    await Promise.all(promises);

  }
}
