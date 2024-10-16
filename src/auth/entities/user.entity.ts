import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';



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

    @BeforeInsert()
    async hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }


}
