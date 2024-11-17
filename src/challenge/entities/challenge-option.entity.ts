import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';

@Entity({ name: 'challenge_option' })
export class ChallengeOptions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'challenge_id', nullable: false })
  challengeId: number;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ type: 'boolean', nullable: false })
  correct: boolean;

  @Column({ name: 'image_src', type: 'text', nullable: true })
  imageSrc: string;

  @Column({ name: 'audio_src', type: 'text', nullable: true })
  audioSrc: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.challengeOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;
}
