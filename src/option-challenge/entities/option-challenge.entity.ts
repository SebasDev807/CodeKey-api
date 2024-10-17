import { Challenge } from 'src/challenge/entities/challenge.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'option_challenge' })
export class OptionChallenge {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column('text', { name: 'text', nullable: false })
  public text: string;

  @Column('boolean', { name: 'correct', nullable: false })
  public correct: boolean;

  @Column('text', { name: 'image_src' })
  public imageSrc: string;

  @Column('text', { name: 'audio_src' })
  public audio_src: string;

  // relation
  @ManyToOne(() => Challenge, (challenge) => challenge.optionChallenges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'challenge_id' })
  public challenge: Challenge;
}
