import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { CourseModule } from './course/course.module';
import { LessonService } from './lesson/lesson.service';
import { LessonModule } from './lesson/lesson.module';
import { UnitModule } from './unit/unit.module';

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
    }),

    // Modules
    UserModule,
    MailerModule,
    CourseModule,
    LessonModule,
    UnitModule,
  ],

  controllers: [],
  providers: [LessonService],
})
export class AppModule {}
