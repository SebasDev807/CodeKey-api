import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChallengeProgress } from 'src/challenge/entities/challenge-progress.entity';


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    email: string;

    @Column({ type: 'text', nullable: false, select: false })
    password: string;

    @Column({ type: 'text', nullable: true })
    token: string;

    @Column({ type: 'bool', default: false })
    confirmed: boolean;

    @Column('text', { array: true, default: ['USER'] },)
    roles: string[];

    @OneToMany(
        () => ChallengeProgress,
        challengeProgress => challengeProgress.user,
        { onDelete: 'CASCADE' }
    )
    progress: ChallengeProgress[];

    //Antes de insertar hashea la contraseña
    @BeforeInsert()
    async hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

}
