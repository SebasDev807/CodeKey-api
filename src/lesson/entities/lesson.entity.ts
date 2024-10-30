
import { Unit } from '../../unit/entities/unit.entity';
import {
  Column,
  Entity,
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
  public title: string;

  @Column('int', { unique: true, nullable: false })
  public order: number;

  @ManyToOne(
    () => Unit,
    unit => unit.lessons,
    { onDelete: 'CASCADE' }
  )
  public unit: Unit;


  @OneToMany(
    () => Challenge,
    challenge => challenge.lesson,
    { onDelete: 'CASCADE' }
  )
  public challenges: Challenge[]
}






// @OneToMany(() => Unit, (unit) => unit.course)
// public units: Unit[]; // A course has many units

// @OneToMany(() => Challenge, (challenge) => challenge.lesson)
// public challenge: Challenge[];
