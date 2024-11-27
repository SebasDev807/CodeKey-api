import { Lesson } from "src/lesson/entities/lesson.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'challenge_code' })
export class ChallengeCode {

    @PrimaryColumn()
    id: number;

    @Column('text', { nullable: false })
    code: string;

    @Column('text', { nullable: false })
    title: string;


    @Column('text', { nullable: false })
    description: string;


    @Column('text', { nullable: false })
    expectedOutput: string;

    @ManyToOne(
        () => Lesson,
        lesson => lesson.challengeCodes,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn()
    lesson: Lesson;

}