import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { ChallengeType } from '../interfaces/challenge-type.enum';
import { ChallengeOptions } from './challenge-option.entity';
import { ChallengeProgress } from './challenge-progress.entity';

@Entity({ name: 'challenges' })
export class Challenge {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'lesson_id', nullable: false })
  lessonId: number;

  @Column({
    type: 'enum',
    enum: ChallengeType,
    nullable: false,
  })
  type: ChallengeType;

  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({ type: 'integer', nullable: false })
  order: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.challenges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @OneToMany(() => ChallengeOptions, (option) => option.challenge)
  challengeOptions: ChallengeOptions[];

  @OneToMany(() => ChallengeProgress, (progress) => progress.challenge)
  challengeProgress: ChallengeProgress[];
}
