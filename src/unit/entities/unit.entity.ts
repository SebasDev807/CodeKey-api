import { Course } from 'src/course/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'unit' })

export class Unit {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text', { nullable: false })
  public title: string;

  @Column('text', { nullable: false })
  public description: string;

  @ManyToOne(
    () => Course,
    course => course.units,
    { onDelete: 'CASCADE' }
  )
  public course: Course;

  @OneToMany(
    () => Lesson,
    lesson => lesson.unit,
    { onDelete: 'CASCADE' }
  )
  public lessons: Lesson[]

  @Column('int', { unique: true, nullable: false })
  public order: number;
}

