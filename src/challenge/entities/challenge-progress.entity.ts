import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
