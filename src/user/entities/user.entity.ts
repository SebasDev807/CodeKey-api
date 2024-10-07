import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        nullable: false
    })
    public name: string;

    @Column({
        unique: true,
        nullable: false
    })
    public email: string;

    @Column({
        nullable: false,
    })
    public password: string;

    // Antes de insertar, encripta la contraseña
    @BeforeInsert()
    async hashPassword() {
        console.log('Hashing password before insert...');
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Hashed password:', this.password);
    }
}
