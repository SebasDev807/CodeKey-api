import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from './mailer/mailer.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { UnitModule } from './unit/unit.module';
import { AuthModule } from './auth/auth.module';
import { ChallengeModule } from './challenge/challenge.module';
import { OptionChallengeModule } from './option-challenge/option-challenge.module';
import { PregressChallengeModule } from './pregress-challenge/pregress-challenge.module';

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
      synchronize: true
    }), 
    AuthModule,
    MailerModule,
    CourseModule,
    LessonModule,
    UnitModule,
    ChallengeModule,
    OptionChallengeModule,
    PregressChallengeModule

  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
