import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { text } from "stream/consumers";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('text', {

        nullable: false
    })
    public name: string;

    @Column('text', {
        unique: true,
        nullable: false
    })
    public email: string;

    @Column('text', {
        nullable: false,
    })
    public password: string;

    @Column({ type: 'text', nullable: true })
    public token: string;

    @Column({ type: "bool", default: false })
    public confirmed: boolean;

    // Antes de insertar, encripta la contraseña
    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}
