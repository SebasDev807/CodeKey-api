import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn('increment') // Auto-increment primary key
  public id: number;

  @Column('text', { nullable: false })
  public title: string;

  @Column('text', { name: 'image_src', nullable: false })
  public imageSrc: string;
}
