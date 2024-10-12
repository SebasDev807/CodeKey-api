import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from './mailer/mailer.module';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
=======
import { CourseModule } from './course/course.module';
import { LessonService } from './lesson/lesson.service';
import { LessonModule } from './lesson/lesson.module';
import { UnitModule } from './unit/unit.module';
>>>>>>> 0361a7876bfc95128dcf37152a79ef9cdb8d0770

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
<<<<<<< HEAD
      synchronize: true
    }), MailerModule, AuthModule
=======
      synchronize: true,
    }),

    // Modules
    UserModule,
    MailerModule,
    CourseModule,
    LessonModule,
    UnitModule,
>>>>>>> 0361a7876bfc95128dcf37152a79ef9cdb8d0770
  ],

  controllers: [],
  providers: [LessonService],
})
export class AppModule {}
