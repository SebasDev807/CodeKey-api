import { Max, MaxLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany, // Importar para la relación inversa
  JoinColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';

@Entity({ name: 'unit' })
export class Unit {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column('text', { nullable: false })
  @MaxLength(100)
  public title: string;

  @Column('text', { nullable: false })
  @MaxLength(500)
  public description: string;

  @ManyToOne(() => Course, (course) => course.units, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  public course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.unit) // Agregar relación inversa
  public lessons: Lesson[]; // Relación a Lección

  @Column('int', { unique: true, nullable: false })
  @Max(9999)
  public order: number;
}
