import { Unit } from 'src/unit/entities/unit.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'courses' })

export class Course {

  @PrimaryGeneratedColumn('increment') 
  id: number;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description:string;

  @Column('text', { name: 'image_src', nullable: false })
  imageSrc: string;

  @OneToMany(
    () => Unit,
    unit => unit.course,
    { onDelete: 'CASCADE' }
  )
  units: Unit[]; 

  @CreateDateColumn({ name: 'created_at' }) 
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) 
  updatedAt: Date;
}
