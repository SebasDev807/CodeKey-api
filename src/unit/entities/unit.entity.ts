import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'unit' })
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text', { nullable: false })
  public title: string;

  @Column('text', { nullable: false })
  public description: string;

  // TODO: make relaionship between unit and course
  // @Column('text', {})
  // public courseId: string;

  @Column('int', { unique: true, nullable: false })
  public order: number;
}

// export const units = pgTable('units', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   description: text('description').notNull(),
//   // A unit belongs to a course
//   courseId: integer('course_id')
//     .references(() => courses.id, {
//       onDelete: 'cascade',
//     })
//     .notNull(),
//   order: integer('order').notNull(),
// });
