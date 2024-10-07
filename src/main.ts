import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const env = app.get(ConfigService);
  const corsOrigin = env.get<string>('CLIENT_URL'); //asi accedemos a las variables de entorno en nest

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,POST,PUT,PATCH,DELETE'
  })
  app.useGlobalPipes(

    new ValidationPipe({
      whitelist: true, //Remueve todo lo que no esta en los DTO
      forbidNonWhitelisted: true  //Retorna 400 si hay propiedades no requeridas
    })

  );

  await app.listen(3000);
}
bootstrap();
