import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/unit/entities/unit.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  imports: [
    TypeOrmModule.forFeature([Unit]),
    AuthModule
  ],
})
export class UnitModule {}
