import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from './mailer/mailer.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { UnitModule } from './unit/unit.module';
import { AuthModule } from './auth/auth.module';
import { ChallengeModule } from './challenge/challenge.module';
import { Lesson } from './lesson/entities/lesson.entity';
import { Unit } from './unit/entities/unit.entity';
import { Challenge } from './challenge/entities/challenge.entity';
import { ChallengeOptions } from './challenge/entities/challenge-option.entity';
import { ChallengeProgress } from './challenge/entities/challenge-progress.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), //Configurar variables de entorno

    //Conexion a la base de datos
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        ChallengeProgress,
        ChallengeOptions,
        Challenge,
        Lesson,
        Unit,
      ],
    }),
    AuthModule,
    MailerModule,
    CourseModule,
    LessonModule,
    UnitModule,
    ChallengeModule,
    // OptionChallengeModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
