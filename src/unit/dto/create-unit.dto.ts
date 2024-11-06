import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { Course } from 'src/course/entities/course.entity';

export class CreateUnitDto {

  @MinLength(5)
  @MaxLength(50)
  title: string;

  @MinLength(15)
  @MaxLength(500)
  description: string;

  @IsInt()
  order: number;
 
  @IsInt()
  course: Course;
}
