import { ApiProperty } from '@nestjs/swagger';
import { Unit } from 'src/unit/entities/unit.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'courses' })

export class Course {

  @PrimaryGeneratedColumn('increment') 
  id: number;

  @ApiProperty({
    example: 'Java course',
    uniqueItems: true
  })
  @Column('text', { nullable: false })
  title: string;


  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  })
  @Column('text', { nullable: false })
  description:string;


  @ApiProperty({
    example: 'http://image.png'
  })
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
