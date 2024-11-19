import { Challenge } from 'src/challenge/entities/challenge.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'option_challenge' })
export class ChallengeOptions {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text', { name: 'text', nullable: false })
    text: string;

    @Column('boolean', { name: 'correct', nullable: false })
    correct: boolean;

    // relation
    @ManyToOne(
        () => Challenge,
        challenge => challenge.challengeOptions,
        { onDelete: 'CASCADE' }
    )
    // @JoinColumn({ name: 'challenge_id' })
    challenge: Challenge;

    @Column('text', { name: 'char-order', nullable: false })
    charOrder: string;
}
