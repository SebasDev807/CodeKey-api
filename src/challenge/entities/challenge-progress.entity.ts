import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';

@Entity({ name: 'challenge_progress' })
export class ChallengeProgress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'challenge_id', nullable: false })
  challengeId: number;

  @Column({ default: false, nullable: false })
  completed: boolean;

  @ManyToOne(() => Challenge, (challenge) => challenge.challengeProgress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;
}
