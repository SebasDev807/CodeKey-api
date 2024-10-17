import { Max, MaxLength } from 'class-validator';
import { Unit } from '../../unit/entities/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Challenge } from 'src/challenge/entities/challenge.entity';

@Entity({ name: 'lesson' }) // Asegúrate de que el nombre sea correcto
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column('text', { nullable: false })
  @MaxLength(100)
  public title: string;

  @Column('int', { unique: true, nullable: false })
  @Max(9999)
  public order: number;

  @ManyToOne(() => Unit, (unit) => unit.lessons, { onDelete: 'CASCADE' }) // Relación inversa a Unit
  @JoinColumn({ name: 'unit_id' })
  public unit: Unit;

  // @OneToMany(() => Unit, (unit) => unit.course)
  // public units: Unit[]; // A course has many units

  @OneToMany(() => Challenge, (challenge) => challenge.lesson)
  public challenge: Challenge[];
}
