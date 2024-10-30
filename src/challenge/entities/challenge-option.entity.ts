import { Challenge } from 'src/challenge/entities/challenge.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'option_challenge' })
export class ChallengeOptions {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('text', { name: 'text', nullable: false })
    public text: string;

    @Column('boolean', { name: 'correct', nullable: false })
    public correct: boolean;

    @Column('text', { name: 'image_src' })
    public imageSrc: string;

    @Column('text', { name: 'audio_src' })
    public audio_src: string;

    // relation
    @ManyToOne(
        () => Challenge,
        challenge => challenge.challengeOptions,
        { onDelete: 'CASCADE' }
    )
    // @JoinColumn({ name: 'challenge_id' })
    public challenge: Challenge;
}
