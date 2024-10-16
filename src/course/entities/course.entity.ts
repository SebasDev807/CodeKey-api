import { Unit } from 'src/unit/entities/unit.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn('increment') // Auto-increment primary key
  public id: number;

  @Column('text', { nullable: false })
  public title: string;

  @Column('text', { name: 'image_src', nullable: false })
  public imageSrc: string;

  @OneToMany(() => Unit, (unit) => unit.course)
  public units: Unit[]; // A course has many units

  @CreateDateColumn({ name: 'created_at' }) // Automatically stores creation timestamp
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Updates timestamp on entity changes
  public updatedAt: Date;
}
