import { Max, MaxLength } from 'class-validator';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { OptionChallenge } from 'src/option-challenge/entities/option-challenge.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Type {
  SELECT = 'select',
  ASSIST = 'assist',
}

@Entity({ name: 'challenge' })
export class Challenge {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.SELECT,
  })
  public type: Type;

  @Column('text', { nullable: false })
  @MaxLength(2500)
  public question: string;

  @Column('int', { unique: true, nullable: false })
  @Max(9999)
  public order: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.challenge, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  public lesson: Lesson;

  @OneToMany(
    () => OptionChallenge,
    (optionChallenge) => optionChallenge.challenge,
    {
      cascade: true,
    },
  )
  public optionChallenges: OptionChallenge[];
}
