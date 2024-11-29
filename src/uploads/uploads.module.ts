import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilePhoto } from './entities/profile-photo.entity';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([ProfilePhoto])
  ],
})
export class UploadsModule { }
