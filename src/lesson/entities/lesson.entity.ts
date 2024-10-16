import { Max, MaxLength } from 'class-validator';
import { Unit } from '../../unit/entities/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'lesson' }) // Asegúrate de que el nombre sea correcto
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column('text', { nullable: false })
  @MaxLength(100)
  public title: string;

  @ManyToOne(() => Unit, (unit) => unit.lessons, { onDelete: 'CASCADE' }) // Relación inversa a Unit
  @JoinColumn({ name: 'unit_id' })
  public unit: Unit;

  @Column('int', { unique: true, nullable: false })
  @Max(9999)
  public order: number;
}
