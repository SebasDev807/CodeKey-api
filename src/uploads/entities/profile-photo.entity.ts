import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProfilePhoto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text'
    })
    publicId: string;

    @Column({
        type: 'text'
    })
    url: string;

    @ManyToOne(
        () => User,
        user => user.profilePhotoUrl
    )
    user: User;

}
