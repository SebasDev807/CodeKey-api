import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/unit/entities/unit.entity';

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  imports: [TypeOrmModule.forFeature([Unit])],
})
export class UnitModule {}
