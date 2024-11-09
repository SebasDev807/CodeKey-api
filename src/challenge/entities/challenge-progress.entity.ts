import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Challenge } from './challenge.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'challenge_progress' })
export class ChallengeProgress {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => User,
        user => user.progress,
        { onDelete: 'CASCADE' }
    )
    user: User;
}
