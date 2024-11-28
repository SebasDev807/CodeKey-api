import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
} from 'typeorm';
import { Course } from 'src/course/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'example perez',
    description: 'username',
  })
  @Column({ type: 'text', nullable: false })
  name: string;

  @ApiProperty({
    example: 'https://img.clerk.com/<hash>',
    description: 'user image',
    uniqueItems: true,
  })
  @Column({
    type: 'text',
    nullable: false,
    name: 'image_src',
    default: 'mascot.svg',
  })
  imageSrc: string;

  @Column({
    type: 'integer',
    name: 'active_course_id',
  })
  activeCourseId: number;

  @ApiProperty({
    example: '1',
    description: 'Reference witch one course is doing the user',
    uniqueItems: true,
  })
  @ManyToOne(
    () => Course,
    course => course.users,
    {onDelete: 'CASCADE'}
  )
  @JoinColumn({ name: 'active_course_id' })
  activeCourse: Course;

  @Column({ type: 'text', nullable: false })
  email: string;

  @ApiProperty({
    example: 'Pass123456',
    description: 'user email',
  })
  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  token: string;

  @Column({ type: 'bool', default: false })
  confirmed: boolean;

  @Column('text', { array: true, default: ['USER'] })
  roles: string[];

  @Column({ type: 'int', nullable: false, default: 5 })
  hearts: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  points: number;

  @BeforeInsert()
  @BeforeUpdate()
  validateHearts() {
    if (this.hearts > 5) {
      this.hearts = 5;
    }
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   BeforeInsert,
//   BeforeUpdate,
//   JoinColumn,
// } from 'typeorm';
// import { Course } from 'src/course/entities/course.entity';
// import { ApiProperty } from '@nestjs/swagger';
// import * as bcrypt from 'bcrypt';

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({
//     example: 'example perez',
//     description: 'username',
//   })
//   @Column({ type: 'text', nullable: false })
//   name: string;

//   @ApiProperty({
//     example: 'https://img.clerk.com/<hash>',
//     description: 'user image',
//     uniqueItems: true,
//   })
//   @Column({
//     type: 'text',
//     nullable: false,
//     name: 'image_src',
//     default: 'mascot.svg',
//   })
//   imageSrc: string;

//   @Column({
//     type: 'integer',
//     name: 'active_course_id',
//   })
//   activeCourseId: number;

//   @ApiProperty({
//     example: '1',
//     description: 'Reference witch one course is doing the user',
//     uniqueItems: true,
//   })
//   @ManyToOne(() => Course, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'active_course_id' })
//   activeCourse: Course;

//   @Column({ type: 'text', nullable: false })
//   email: string;

//   @ApiProperty({
//     example: 'Pass123456',
//     description: 'user email',
//   })
//   @Column({ type: 'text', nullable: false, select: false })
//   password: string;

//   @Column({ type: 'text', nullable: true })
//   token: string;

//   @Column({ type: 'bool', default: false })
//   confirmed: boolean;

//   @Column('text', { array: true, default: ['USER'] })
//   roles: string[];

//   @Column({ type: 'int', nullable: false, default: 5 })
//   hearts: number;

//   @Column({ type: 'int', nullable: false, default: 0 })
//   points: number;

//   @BeforeInsert()
//   @BeforeUpdate()
//   validateHearts() {
//     if (this.hearts > 5) {
//       this.hearts = 5;
//     }
//   }

//   @BeforeInsert()
//   async hashPassword() {
//     const salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
//   }
// }

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
//   BeforeInsert,
//   BeforeUpdate,
// } from 'typeorm';
// import { Course } from 'src/course/entities/course.entity';
// import { ApiProperty } from '@nestjs/swagger';
// import { ChallengeProgress } from 'src/challenge/entities/challenge-progress.entity';
// import * as bcrypt from 'bcrypt';

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({
//     example: 'example perez',
//     description: 'username',
//   })
//   @Column({ type: 'text', nullable: false })
//   name: string;

//   @ApiProperty({
//     example: 'https://img.clerk.com/<hash>',
//     description: 'user image',
//     uniqueItems: true,
//   })
//   @Column({
//     type: 'text',
//     nullable: false,
//     name: 'image_src',
//     default: 'mascot.svg',
//   })
//   imageSrc: string;

//   @ApiProperty({
//     example: '1',
//     description: 'Reference witch one course is doing the user',
//     uniqueItems: true,
//   })
//   @ManyToOne(() => Course, (course) => course.users, {
//     nullable: false,
//     onDelete: 'CASCADE',
//     lazy: true,
//   })
//   activeCourse: Promise<Course>;

//   @Column({ type: 'text', nullable: false })
//   email: string;

//   @ApiProperty({
//     example: 'Pass123456',
//     description: 'user email',
//   })
//   @Column({ type: 'text', nullable: false, select: false })
//   password: string;

//   @Column({ type: 'text', nullable: true })
//   token: string;

//   @Column({ type: 'bool', default: false })
//   confirmed: boolean;

//   @Column('text', { array: true, default: ['USER'] })
//   roles: string[];

//   @Column({ type: 'int', nullable: false, default: 5 })
//   hearts: number;

//   @Column({ type: 'int', nullable: false, default: 0 })
//   points: number;

//   @BeforeInsert()
//   @BeforeUpdate()
//   validateHearts() {
//     if (this.hearts > 5) {
//       this.hearts = 5;
//     }
//   }

//   @BeforeInsert()
//   async hashPassword() {
//     const salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
//   }
// }
