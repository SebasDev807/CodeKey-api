import { Max, MaxLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity'; // Import Course entity for relationship

@Entity({ name: 'unit' })
export class Unit {
  @PrimaryGeneratedColumn('uuid') // Use UUID for unique ID
  public id: string;

  @Column('text', { nullable: false })
  @MaxLength(100) // Maximum length for the title
  public title: string;

  @Column('text', { nullable: false })
  @MaxLength(500) // Set a reasonable limit for description (can adjust)
  public description: string;

  @ManyToOne(() => Course, (course) => course.units, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' }) // course_id as the foreign key in units table
  public course: Course; // Relation to the Course entity

  @Column('int', { unique: true, nullable: false })
  @Max(9999) // Limit order value to prevent overflow
  public order: number;
}
