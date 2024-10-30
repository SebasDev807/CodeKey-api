import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  const env = app.get(ConfigService);

  //asi accedemos a las variables de entorno en nest
  const port = env.get<number>('PORT');
  const corsOrigin = env.get<string>('CLIENT_URL'); 

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

  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
bootstrap();
