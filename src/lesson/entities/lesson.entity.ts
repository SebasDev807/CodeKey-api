
import { Unit } from '../../unit/entities/unit.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Challenge } from 'src/challenge/entities/challenge.entity';

@Entity({ name: 'lesson' })
export class Lesson {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  title: string;

  @Column('int', { unique: true, nullable: false })
  order: number;

  @Column('text')
  text:string;
  
  @Column('text')
  code: string;

  @ManyToOne(
    () => Unit,
    unit => unit.lessons,
    { onDelete: 'CASCADE' }
  )
  unit: Unit;


  @OneToMany(
    () => Challenge,
    challenge => challenge.lesson,
    { onDelete: 'CASCADE' }
  )
  challenges: Challenge[]
}






// @OneToMany(() => Unit, (unit) => unit.course)
// public units: Unit[]; // A course has many units

// @OneToMany(() => Challenge, (challenge) => challenge.lesson)
// public challenge: Challenge[];
