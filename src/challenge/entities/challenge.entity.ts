
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ChallengeType } from '../interfaces/challenge-type.enum';
import { ChallengeOptions } from './challenge-option.entity';


@Entity({ name: 'challenge' })
export class Challenge {

  @PrimaryColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ChallengeType,
    default: ChallengeType.SELECT,
  })
  challengeType: ChallengeType;

  @Column('text', { nullable: false })
  question: string;


  @Column('int', { unique: true, nullable: false })
  order: number;


  @ManyToOne(
    () => Lesson,
    lesson => lesson.challenges,
    { onDelete: 'CASCADE' }
  )
  lesson: Lesson;

  @OneToMany(
    () => ChallengeOptions,
    ChallengeOptions => ChallengeOptions.challenge,
    { cascade: true, },
  )
  challengeOptions: ChallengeOptions[];


}

// @ManyToOne(() => Lesson, (lesson) => lesson.challenge, {
//   onDelete: 'CASCADE',
// })
// @JoinColumn({ name: 'lesson_id' })
// public lesson: Lesson;